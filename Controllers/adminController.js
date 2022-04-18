const mongoose = require("mongoose");
const express = require("express");
const adminModel = require("../model/admin");
const adherentModel = require("../model/adherent");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secret = "test";
const _ = require("lodash");
const admin = require("../model/admin");

//hedhi ili nadhreb aleha
login = async (req, res, next) => {
  let admin = await adherentModel.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).json({ message: "Invalid Email or Password " });
  }
  const checkPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Email or Password " });
  }

  const token = admin.generateTokens();

  // await admin.save();
  res.status(200).json({
    token: token,
    admin: {
      _id: admin.id,
      email: admin.email,
      role: admin.role,
    },
  });
};

register = async (req, res) => {
  const oldadmin = await adminModel.findOne({ email: req.body.email });
  if (oldadmin) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const admin = new adminModel(req.body);
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
  admin.role="admin";
  

  await admin.save();
  const token = admin.generateTokens();
  res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
};
changerpwdsuper = async (req, res, next) => {
  const admin = await adminModel.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).json({ message: "Email doesn't exists" });
  }
  const checkPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!checkPassword) {
    return res.status(400).json({ message: "Invalid Email or Password " });
  }
  const salt = await bcrypt.genSalt(10);
  const verifPassword = await bcrypt.compare(
    req.body.oldpassword,
    admin.password
  );

  if (!verifPassword) {
    return res.status(400).json({ message: "Invalid old password " });
  } else {
    admin.password = await bcrypt.hash(req.body.Confirmpassword, salt);
    await admin.save();
    const token = admin.generateTokens();
    res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
  }
};

changerpwdadmin = async (req, res, next) => {
  console.log(req.body);
  const admin = await adminModel.findOne({ email: req.body.email });
  if (!admin) {
    return res.status(400).json({ message: "Email doesn't exists" });
  }

  const salt = await bcrypt.genSalt(10);

  const verifPassword = await bcrypt.compare(
    req.body.oldpassword,
    admin.password
  );

  if (!verifPassword) {
    return res.status(400).json({ message: "ancien mot de passe erroné " });
  } else {
    admin.password = await bcrypt.hash(req.body.Confirmpassword, salt);
    await admin.save();
    const token = admin.generateTokens();
    res.header("x-auth-token", token).send(_.pick(admin, ["_id", "email"]));
  }


};


module.exports = {
  register,
  login,
  };
