const Sector = require("../model/SectorModel");

exports.addSector = (req, res) => {
  const sectorObj = {
    name: req.body.name,
    // createdBy: req.user._id,
    createdBy: "63ced3e8cf82fa64ec11e795",
  };

  if (req.body.parentId) {
    sectorObj.parentId = req.body.parentId;
  }

  const sector = new Sector(sectorObj);
  sector.save((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      return res.status(200).json({ data });
    }
  });
};

function createSectors(categories, parentId = null) {
  const sectorList = [];
  let sector;

  if (parentId == null) {
    sector = categories.filter((cat) => cat.parentId == undefined);
  } else {
    sector = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cate of sector) {
    sectorList.push({
      _id: cate._id,
      name: cate.name,
      parentId: cate?.parentId ? cate?.parentId : null,
      children: createSectors(categories, cate._id),
    });
  }
  return sectorList;
}
exports.getSectors = (req, res) => {
  Sector.find({}).exec((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      const sectorstList = createSectors(data);
      return res.status(200).json({ sectorstList });
    }
  });
};
