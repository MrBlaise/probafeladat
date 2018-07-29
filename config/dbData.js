module.exports = (User, name, pass) => {
    const admin = new User({ name: name, password: pass });
    admin.save().then(() => {});
};