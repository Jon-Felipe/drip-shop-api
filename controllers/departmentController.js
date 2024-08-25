import Department from '../models/DepartmentModel.js';

export async function getDepartment(req, res) {
  const { department } = req.params;
  const foundDepartment = await Department.findOne({
    name: { $regex: department, $options: 'i' },
  });
  res.status(200).json({ department: foundDepartment });
}

export async function createDepartment(req, res) {
  const department = await Department.create(req.body);
  res.status(201).json({ department });
}
