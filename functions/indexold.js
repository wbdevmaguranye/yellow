const functions = require("firebase-functions");

const admin = require("firebase-admin");
const FieldValue = admin.firestore.FieldValue;

const cors = require("cors")({ origin: true });

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(async (request, response) => {
  const isValidBearer = await validBearer(request);
  if (isValidBearer) {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
  } else {
    response.status(401).json({ error: "Unauthorized" });
  }
});

exports.helloWorldTwo = functions.https.onCall(async (data, context) => {
  //   const isValidBearer = await validBearer(request);
  const key = functions.config().wozipobearer.key;
  console.log(data);
  console.log(context.token);
  if (key == context.token) {
    functions.logger.info("Hello logs!", { structuredData: true });
    return { message: "Hello from Firebase" };
  } else {
    return { status: "error", code: 401, message: "Unauthorized" };
  }
});

exports.getUser = functions.https.onCall(async (data, context) => {
  if (!context.auth)
    return { status: "error", code: 401, message: "Not signed in" };
  return new Promise((resolve, reject) => {
    // find a user by data.uid and return the result

    resolve(user);
  });
});

exports.testFunction = functions.https.onCall(() => {
  console.info("Test Function triggered");
  return { message: "Yeaaahh it's working!" };
});

// exports.addMessage = functions.https.onRequest(async (req, res) => {
//   // Grab the text parameter.
//   const original = req.query.text;
//   // Push the new message into Firestore using the Firebase Admin SDK.
//   const writeResult = await admin
//     .firestore()
//     .collection("messages")
//     .add({ original: original });
//   // Send back a message that we've successfully written the message
//   res.json({ result: `Message with ID: ${writeResult.id} added.` });
// });

exports.ChangeLoanStatus = functions.https.onRequest(async (req, res) => {
  const isValidBearer = await validBearer(req);
  if (isValidBearer) {
    const applicationId = req.query.ApplicationId;
    const uuid = req.query.UserId;
    const status = req.query.StatusId;
    // Push the new message into Firestore using the Firebase Admin SDK.
    if (applicationId && uuid && status) {
      const applyRef = await admin
        .firestore()
        .collection("Applications")
        .doc(uuid)
        .collection("Apply")
        .doc(applicationId);
      var setWithMerge = applyRef.set(
        {
          status: status
        },
        { merge: true }
      );

      const addStatusRef = await admin
        .firestore()
        .collection("Applications")
        .doc(uuid)
        .collection("AppStatus")
        .doc(applicationId)
        .collection("StatusHistory");
      let applyData = {};

      const applyChangedRef = await admin
        .firestore()
        .collection("Applications")
        .doc(uuid)
        .collection("Apply")
        .doc(applicationId);
      const applySnap = applyChangedRef.get();
      if (applySnap.exists) {
        applyData = await applySnap.data();
      }

      res.send("Success");
    } else {
      res.status(400).send("Not All parameters supplied");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
});

exports.GetLoanDetails = functions.https.onRequest(async (req, res) => {
  const isValidBearer = await validBearer(req);
  if (isValidBearer) {
    const applicationId = req.query.ApplicationId;
    const uuid = req.query.UserId;
    console.log(applicationId);

    // configure application data
    let Apply = {};
    let BankingInfo = {};
    let DependantsInfo = {};
    let EmploymentInfo = {};
    let ExpenditureInfo = {};
    let LivingDetailsInfo = {};
    let NextofKinInfo = {};
    let PersonalInfo = {};
    let DocInfo = [];

    if (applicationId && uuid) {
      const applyRef = await admin
        .firestore()
        .collection("Applications")
        .doc(uuid)
        .collection("Apply")
        .doc(applicationId);

      const apply = await applyRef.get();
      if (!apply.exists) {
        res.send("Record Not Found");
        return;
      } else {
        Apply = apply.data();
      }

      const bankingRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("BankingInfo")
        .doc(applicationId);

      const banking = await bankingRef.get();
      if (banking.exists) {
        BankingInfo = banking.data();
      }

      const dependantsRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("DependantsInfo")
        .doc(applicationId);

      const dependant = await dependantsRef.get();
      if (dependant.exists) {
        DependantsInfo = dependant.data();
      }

      const employmentRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("EmploymentInfo")
        .doc(applicationId);

      const employment = await employmentRef.get();
      if (employment.exists) {
        EmploymentInfo = employment.data();
      }

      const expendatureRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("ExpenditureInfo")
        .doc(applicationId);

      const expenditure = await expendatureRef.get();
      if (expenditure.exists) {
        ExpenditureInfo = expenditure.data();
      }

      const livingDetailsRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("LivingDetailsInfo")
        .doc(applicationId);

      const livingdetails = await livingDetailsRef.get();
      if (livingdetails.exists) {
        LivingDetailsInfo = livingdetails.data();
      }

      const nextOfKinRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("NextOfKinInfo")
        .doc(applicationId);

      const nextofkin = await nextOfKinRef.get();
      if (nextofkin.exists) {
        NextofKinInfo = nextofkin.data();
      }

      const personalinfoRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("PersonalInfo")
        .doc(applicationId);

      const personal = await personalinfoRef.get();
      if (personal.exists) {
        PersonalInfo = personal.data();
      }

      const fileRef = await admin
        .firestore()
        .collection("AppDetails")
        .doc(uuid)
        .collection("DocInfo")
        .doc(applicationId)
        .collection("files");

      const docs = await fileRef.get();
      docs.forEach(doc => {
        let path = doc.ref.path;
        let parent = doc.ref.parent.path;

        let data = doc.data();
        data["key"] = doc.id;
        data["path"] = path;
        DocInfo.push(data);
      });

      const fullApp = {
        Apply: Apply,
        BankingInfo: BankingInfo,
        DependantsInfo: DependantsInfo,
        EmploymentInfo: EmploymentInfo,
        ExpenditureInfo: ExpenditureInfo,
        LivingDetailsInfo: LivingDetailsInfo,
        NextofKinInfo: NextofKinInfo,
        PersonalInfo: PersonalInfo,
        DocInfo: DocInfo
      };

      res.status(200).json(fullApp);
    } else {
      res.status(400).send("Not All parameters supplied");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
  // Grab the text parameter.

  // const writeResult = await admin
  //   .firestore()
  //   .collection("messages")
  //   .add({ original: original });
  // Send back a message that we've successfully written the message
  //res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.makeUppercase = functions.firestore
  .document("/messages/{documentId}")
  .onCreate((snap, context) => {
    // Grab the current value of what was written to Firestore.
    const original = snap.data().original;

    // Access the parameter `{documentId}` with `context.params`
    functions.logger.log("Uppercasing", context.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return snap.ref.set({ uppercase }, { merge: true });
  });

async function validBearer(request) {
  //https://www.uuidgenerator.net/  generate a token using...
  const key = functions.config().wozipobearer.key;

  const authorization = request.get("Authorization");
  const split = authorization ? authorization.split("Bearer ") : [];
  const bearerKey = split && split.length >= 2 ? split[1] : undefined;

  return key === bearerKey;
}
