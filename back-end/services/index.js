exports.generateCrudMethods = (Model) => {
    return {
        getAll: () => Model.find().sort({ dueDate: "asc" }),
        getById: (id) => Model.findById(id),
        create: (record) => Model.create(record),
        singleDelete: (id) => Model.findByIdAndDelete(id),
        multipleDelete: (record) => Model.deleteMany({ _id: record }),
        update: (id, record) =>
            Model.findByIdAndUpdate(id, record, { new: true }),
    };
};
