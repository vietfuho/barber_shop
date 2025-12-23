const Service = require("../models/services");

// Tạo dịch vụ mới
exports.create = async (req, res) => {
  try {
    const { name, description, price, duration, imageUrl, styleOptions, colorOptions, isActive } = req.body;

    let parsedColors = [];
    if (colorOptions) {
      try {
        parsedColors = JSON.parse(colorOptions);
      } catch {
        parsedColors = Array.isArray(colorOptions) ? colorOptions : [colorOptions];
      }
    }

    const service = new Service({
      name,
      description,
      price: price ? Number(price) : 0,
      duration: duration ? Number(duration) : 0,
      imageUrl: imageUrl || null,
      imageFile: req.file ? req.file.filename : null,
      styleOptions: Array.isArray(styleOptions) ? styleOptions : [styleOptions],
      colorOptions: parsedColors,
      isActive: isActive !== undefined ? (isActive === "true" || isActive === true) : true,
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    console.error("Create Service Error:", err);
    res.status(500).json({ error: "Lỗi tạo dịch vụ" });
  }
};

// Lấy tất cả dịch vụ
exports.getAll = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy danh sách dịch vụ" });
  }
};

// Lấy một dịch vụ theo ID
exports.getOne = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: "Không tìm thấy dịch vụ" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Lỗi lấy dịch vụ" });
  }
};

// Cập nhật dịch vụ
exports.update = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      updateData.imageFile = req.file.filename;
    }

    if (updateData.colorOptions) {
      try {
        updateData.colorOptions = JSON.parse(updateData.colorOptions);
      } catch {
        updateData.colorOptions = Array.isArray(updateData.colorOptions)
          ? updateData.colorOptions
          : [updateData.colorOptions];
      }
    }

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.duration) updateData.duration = Number(updateData.duration);
    if (updateData.isActive !== undefined) {
      updateData.isActive = updateData.isActive === "true" || updateData.isActive === true;
    }

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!service) return res.status(404).json({ error: "Không tìm thấy dịch vụ để cập nhật" });

    res.json(service);
  } catch (err) {
    console.error("Lỗi cập nhật dịch vụ:", err);
    res.status(500).json({ error: "Lỗi cập nhật dịch vụ" });
  }
};

// Xóa dịch vụ
exports.remove = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ error: "Không tìm thấy dịch vụ để xóa" });
    res.json({ message: "Xóa dịch vụ thành công" });
  } catch (err) {
    res.status(500).json({ error: "Lỗi xóa dịch vụ" });
  }
};