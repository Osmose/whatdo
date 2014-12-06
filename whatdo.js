(function() {
    'use strict';

    var chart = document.querySelector('#chart');

    Tabletop.init({
        key: '1KNQJDJLQWjWLMF7rr3E9Y4PRy_6alURnC7_IhhIK4dM',
        callback: function(data, tabletop) {
            var projectsSheet = data.Projects;
            var projects = [];
            projectsSheet.elements.forEach(function(row) {
                projects.push(row.projectName);
            });

            var months = [];
            for (var sheet in data) {
                if (sheet !== 'Projects') {
                    months.push(data[sheet]);
                }
            }

            var people = {};
            months.forEach(function(month) {
                month.elements.forEach(function(row) {
                    for (var column in row) {
                        if (column !== 'project' && month.column_names.indexOf(column) !== -1) {
                            if (!people.hasOwnProperty(column)) {
                                people[column] = {};
                            }

                            if (people[column][month.name] === undefined) {
                                people[column][month.name] = [];
                            }

                            var percent = 0;
                            if (row[column]) {
                                percent = parseInt(row[column].replace('%', ''), 10);
                            }
                            people[column][month.name].push({
                                name: row.project,
                                percent: percent,
                            });
                        }
                    }
                });
            });

            console.log(months);
            console.log(people);

            var headerRow = document.createElement('tr');
            headerRow.appendChild(document.createElement('th'));
            months.forEach(function(month) {
                var headerCell = document.createElement('th');
                headerCell.textContent = month.name;
                headerRow.appendChild(headerCell);
            });
            chart.appendChild(headerRow);

            for (var name in people) {
                var personRow = document.createElement('tr');
                var nameCell = document.createElement('td');
                nameCell.textContent = name;
                personRow.appendChild(nameCell);
                months.forEach(function(month) {
                    var personMonthCell = document.createElement('td');
                    people[name][month.name].forEach(function(project) {
                        if (project.percent > 0) {
                            var timeBlock = document.createElement('div');
                            timeBlock.classList.add('time-block');
                            timeBlock.classList.add('percent-' + project.percent);
                            timeBlock.textContent = project.name;
                            personMonthCell.appendChild(timeBlock);
                        }
                    });
                    personRow.appendChild(personMonthCell);
                });
                chart.appendChild(personRow);
            }
        },
    });
})();
