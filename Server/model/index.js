
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('mysql://root:mpp25xx4@localhost:3306/mysql');

try {
    sequelize.authenticate();
    console.log('Connection to DB has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
    exit(1);
}

// Task table
const Tasks = sequelize.define('tasks', { 
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true
    },
    text: Sequelize.STRING,
    completed: Sequelize.BOOLEAN
}, {
    timestamps: false,
});

module.exports = Tasks;