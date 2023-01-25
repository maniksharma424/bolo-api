import { Config } from "./Config_model.js";
import cloudinary from "../../../Utils/cloudinary.js";
// // Add GST
// const addGST = async (req, res) => {
//   const { gst } = req.body;
//   try {
//     if (!gst) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Please Provide Valid GST Value",
//       });
//     }
//     const configuration = await Config.find();

//     if (configuration.length === 0) {
//       const createGst = await Config.create({
//         gst,
//       });

//       if (createGst) {
//         return res.status(201).json({
//           status: "success",
//           message: "GST Created",
//         });
//       }
//     } else {
//       const updateGst = await Config.updateOne(
//         {},
//         {
//           $set: {
//             gst,
//           },
//         }
//       );

//       if (updateGst) {
//         return res.status(200).json({
//           status: "success",
//           message: "Updated GST Successfully",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// Add Social Media

const addSocialMedia = async (req, res) => {
  const { facebook, twitter, instagram, linkedin, mail, youtube, pinterest } =
    req.body;

  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "failed",
        message: "Please Provide Social Links",
      });
    }

    const socialMediaLink = await Config.find();
    if (socialMediaLink.length === 0) {
      const createSocialLinks = await Config.create({
        socialMedia: {
          facebook,
          twitter,
          instagram,
          linkedin,
          youtube,
          mail,
          pinterest,
        },
      });

      if (createSocialLinks) {
        return res.status(201).json({
          status: "success",
          message: "Added Social Media Links Successfully",
        });
      }
    } else {
      const updateSocial = await Config.updateOne(
        {},
        {
          $set: {
            socialMedia: {
              facebook,
              twitter,
              instagram,
              linkedin,
              mail,
              youtube,
              pinterest,
            },
          },
        }
      );
      if (updateSocial) {
        return res.status(200).json({
          status: "success",
          message: "Updated Social Media Links Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// add Address

const addAddress = async (req, res) => {
  const {
    company,
    address,
    city,
    state,
    country,
    pincode,
    website,
    contact,
    email,
    gstin,
  } = req.body;
  console.log(req.body);
  if (
    !company ||
    !address ||
    !city ||
    !state ||
    !country ||
    !pincode ||
    !contact ||
    !email ||
    !gstin
  ) {
    return res.status(400).json({
      status: "failed",
      message: "Please Provide All Fields",
    });
  }
  try {
    const getAddress = await Config.find();
    if (getAddress.length === 0) {
      const createAddress = await Config.create({
        address: {
          company,
          address,
          city,
          state,
          country,
          pincode,
          website,
          contact,
          email,
          gstin,
        },
      });

      if (createAddress) {
        return res.status(201).json({
          status: "success",
          message: "created address successfully",
        });
      }
    } else {
      const updateAddress = await Config.updateOne(
        {},
        {
          $set: {
            address: {
              company,
              address,
              city,
              state,
              country,
              pincode,
              website,
              contact,
              email,
              gstin,
            },
          },
        }
      );

      if (updateAddress) {
        return res.status(200).json({
          status: "success",
          message: "Updated Address Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// get configuration

const getConfig = async (req, res) => {
  try {
    const configration = await Config.find({});
    if (configration) {
      res.status(200).json({
        status: "success",
        result: configration,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// add logo
const addLogo = async (req, res) => {
  try {
    const configuration = await Config.find();


    // console.log(req.files);


    let result1
    let result2
    let result3
    // console.log(req.files.Headerlogo)
    if (req.files.Headerlogo) {


      const result = await cloudinary.v2.uploader.upload(
        req.files.Headerlogo.tempFilePath,
        { folder: "ATP/Logo" }
      );
      result1 = result.secure_url;
    }
    if (req.files.Footerlogo) {
      const result = await cloudinary.v2.uploader.upload(
        req.files.Footerlogo.tempFilePath,
        { folder: "ATP/Logo" }
      );
      result2 = result.secure_url;
    }
    if (req.files.Adminlogo) {
      // console.log(req.files.Adminlogo.path)
      const result = await cloudinary.v2.uploader.upload(
        req.files.Adminlogo.tempFilePath,
        { folder: "ATP/Logo" }
      );
      result3 = result.secure_url;
    }

    // console.log(result1);
    // console.log(result2);
    // console.log(result3);

    if (configuration.length === 0) {
      const createLogo = await Config.create({
        logo: {
          Headerlogo: result1,
          Footerlogo: result2,
          Adminlogo: result3,
        },
      });

      if (createLogo) {
        return res.status(200).json({
          status: "success",
          message: "Created Logos Successfully",
        });
      }
    } else {


      const updateLogo = await Config.updateOne(
        {},
        {
          $set: {
            logo: {
              Headerlogo: result1,
              Footerlogo: result2,
              Adminlogo: result3,
            },
          },
        }
      );
      if (updateLogo) {
        return res.status(200).json({
          status: "success",
          message: "Updated Logos Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// //add scrollText
// const addScrollText = async (req, res) => {
//   const { scrollText } = req.body;

//   try {
//     if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
//       return res.status(400).json({
//         status: "failed",
//         message: "Please Provide Scroll Text",
//       });
//     }

//     const config = await Config.find();
//     if (config.length === 0) {
//       const createScrollText = await Config.create(req.body);

//       if (createScrollText) {
//         return res.status(201).json({
//           status: "success",
//           message: "Added Scroll Text Successfully",
//         });
//       }
//     } else {
//       const updateScroll = await Config.updateOne(
//         {},
//         {
//           $set: {
//             scrollText: scrollText,
//           },
//         }
//       );
//       if (updateScroll) {
//         return res.status(200).json({
//           status: "success",
//           message: "Updated Scroll Text Successfully",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

//terms of use
const addTermsOfUse = async (req, res) => {
  try {
    const config = await Config.find();
    if (config.length === 0) {
      const createScrollText = await Config.create(req.body);
      if (createScrollText) {
        return res.status(201).json({
          status: "success",
          message: "Added Terms of Use Successfully",
        });
      }
    } else {
      const updateScroll = await Config.updateOne(
        {},
        {
          $set: {
            terms_of_use: req.body?.terms_of_use,
          },
        }
      );
      if (updateScroll) {
        return res.status(200).json({
          status: "success",
          message: "Updated Terms of Use Successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const getTermsOfUse = async (req, res) => {
  try {
    let configration = await Config.findOne({});
    if (!configration) configration = await Config.create({});
    res
      .status(200)
      .json({ status: "success", data: configration?.terms_of_use || "" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

const deleteConfig = async (req, res) => {
  const deleteConfig = await Config.deleteMany({});

  console.log(deleteConfig);
};

export {
  // addGST,
  addSocialMedia,
  addAddress,
  getConfig,
  addLogo,
  deleteConfig,
  // addScrollText,
  addTermsOfUse,
  getTermsOfUse,
};
