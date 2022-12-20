import items from "../models/items.model.js";
//creates new document in items collection, with given values in request body
export const createItem = async (req, res) => {
  try {
    console.log(req.file);
    await items
      .create({ ...req.body, image: req.file.path })
      .then((data) =>
        res.json({ msg: "Item created successfully", Data: data })
      )
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//soft-deletes the item.
export const deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = findOne();
    await item
      .updateOne({ _id: id }, { deleted: true })
      .then((data) =>
        res.json({ msg: "Item deleted successfully", Data: data })
      )
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//deletes the item permanently from the db.
export const deleteItemPermanently = async (req, res) => {
  const { id } = req.params;
  try {
    await items
      .deleteOne({ _id: id })
      .then((data) => res.json({ msg: "Item deleted permanently", Data: data }))
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//updates the item with the given id.
export const updateItem = async (req, res) => {
  const { id } = req.params;
  try {
    await items
      .updateOne({ _id: id }, req.body)
      .then((data) =>
        res.json({ msg: "Item updated successfully", Data: data })
      )
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//gets the item with the given id.
export const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    await items
      .findOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//gets all the items.
export const getAllItems = async (req, res) => {
  try {
    await items
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.status(400).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//gets all items by the given filter.
export const getItemsByFilter = async (req, res) => {
  const {
    title,
    category,
    brand,
    ram,
    storage,
    battery,
    camera,
    chipset,
    network,
    os,
    graphics,
    processor,
    type,
  } = req.query;
  try {
    await items
      .find({
        title: title ? { $regex: title, $options: "i" } : "",
        category,
        brand: brand ? brand.split(",") : [],
        ram: ram ? ram.split(",") : [],
        storage: storage ? storage.split(",") : [],
        battery: battery ? battery.split(",") : [],
        camera: camera ? camera.split(",") : [],
        chipset: chipset ? chipset.split(",") : [],
        network: network ? network.split(",") : [],
        os: os ? os.split(",") : [],
        graphics: graphics ? graphics.split(",") : [],
        processor: processor ? processor.split(",") : [],
        type: type ? type.split(",") : [],
      })
      .then((data) => res.json({ data, query: req.query }))
      .catch((error) => res.status(404).json({ msg: error, query: req.query }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getItemBySeller = async (req, res) => {
  const { id } = req.params;
  try {
    items
      .find({ seller: id })
      .then((data) => res.json(data))
      .catch((error) => res.status(404).json({ msg: error.message }));
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getHomeItem = async (req, res) => {
  try {
    const mobileHomeItems = await items.aggregate([
      { $match: { category: "mobile" } },
      { $sort: { discount: -1 } },
      { $limit: 5 },
    ]);
    const audioHomeItems = await items.aggregate([
      { $match: { category: "audio" } },
      { $sort: { discount: -1 } },
      { $limit: 5 },
    ]);
    const laptopHomeItems = await items.aggregate([
      { $match: { category: "laptop" } },
      { $sort: { discount: -1 } },
      { $limit: 5 },
    ]);
    const tabletHomeItems = await items.aggregate([
      { $match: { category: "tablet" } },
      { $sort: { discount: -1 } },
      { $limit: 5 },
    ]);
    const watchHomeItems = await items.aggregate([
      { $match: { category: "watch" } },
      { $sort: { discount: -1 } },
      { $limit: 5 },
    ]);
    return res.status(200).json({
      homeItems: {
        mobileHomeItems,
        audioHomeItems,
        laptopHomeItems,
        tabletHomeItems,
        watchHomeItems,
      },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
