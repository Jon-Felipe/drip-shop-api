import Department from '../models/DepartmentModel.js';

export async function getDepartment(req, res) {
  const { department } = req.params;
  const { sort } = req.query;

  const sortOptions = {
    'a-z': { title: 1 },
    'z-a': { title: -1 },
  };
  const sortKey = sortOptions[sort] || sortOptions['a-z'];

  const foundDepartment = await Department.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'department',
        as: 'products',
        pipeline: [
          {
            $sort: sortKey,
          },
          {
            $limit: 12,
          },
        ],
      },
    },
    {
      $match: { name: { $regex: `^${department}$`, $options: 'i' } },
    },
  ]);
  res.status(200).json({ department: foundDepartment[0] });
}

export async function createDepartment(req, res) {
  const department = await Department.create(req.body);
  res.status(201).json({ department });
}
