require("dotenv").config();
const express = require('express');
const Sequelize = require("sequelize");
const app = express();
app.use(express.json());

const dbUrl = 'postgres://webadmin:EHPopd78174@node73591-noderestthu.proen.app.ruk-com.cloud:11798/ReportIssue'
const sequelize = new Sequelize(dbUrl);

const Equipment = sequelize.define('equipment', {
    equipment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    equipment_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    equipment_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_repair: {
        type: Sequelize.DATE,
        allowNull: true
    },
    repair_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    equipment_add: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, {
    tableName: 'equipment'
});

app.get('/equipment', (req, res) => {
    Equipment.findAll().then(equipment => {
        res.json(equipment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/equipment/:id', (req, res) => {
    Equipment.findByPk(req.params.id).then(equipment => {
        if (!equipment) {
            res.status(404).send('Equipment not found');
        } else {
            res.json(equipment);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/equipment', (req, res) => {
    Equipment.create(req.body).then(equipment => {
        res.send(equipment);
    }).catch(err => {
        res.status(500).send(err);
    });
});

            // -------------------- Model Users --------------------
const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    Role: {
        type: Sequelize.ENUM('user', 'technician', 'admin'),
        allowNull: false,
        defaultValue: 'user'
    },
    created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false // ปิดการใช้งาน `createdAt` และ `updatedAt` อัตโนมัติ
});
app.get('/users', (req, res) => {
    User.findAll().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// ดึงข้อมูลผู้ใช้โดยใช้ ID
app.get('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            res.status(404).send('User not found');
        } else {
            res.json(user);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// สร้างผู้ใช้ใหม่
app.post('/users', (req, res) => {
    User.create(req.body).then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send(err);
    });
});

// อัปเดตข้อมูลผู้ใช้
app.put('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            res.status(404).send('User not found');
        } else {
            user.update(req.body).then(() => {
                res.send(user);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

// ลบผู้ใช้
app.delete('/users/:id', (req, res) => {
    User.findByPk(req.params.id).then(user => {
        if (!user) {
            res.status(404).send('User not found');
        } else {
            user.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


sequelize.sync()
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));