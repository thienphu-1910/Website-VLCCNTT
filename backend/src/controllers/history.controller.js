// import { getDatabase, ref, set, onValue, push } from "firebase/database";

// const db = getDatabase();

// const HistoryPaths = {
//   common: "devices"
// };

// export const HistoryController = {
//   createRecord: async (req, res) => {
//     try {
//       const hisRef = ref(db, `${HistoryPaths.common}/${req.params.id}`);
//       const newRef = await push(hisRef, req.body);
//       const newId = newRef.key;
//       res.status(201).json({...req.body, newId});
//     } catch (err) {
//       res.status(500).json({ message: err })
//     }
//   },
//   getRecords: async (req, res) => {
//     try {
//       const hisRef = ref(db, `${HistoryPaths.common}/${req.params.id}`);
//       onValue(hisRef, (snapshot) => {
//         const rawData = snapshot.val();
//         const formattedArray = Object.keys(rawData).map(key => {
//           return {
//             id: key, 
//             ...rawData[key],
//           }
//         })

//         res.json(formattedArray);
//       })
//     } catch (err) {
//       res.status(500).json({ message: err });
//     }
//   }
// }

import { db } from "../config/firebaseAdmin.js";

const HistoryPaths = {
  common: "devices"
};

export const HistoryController = {
  createRecord: async (req, res) => {
    try {
      const data = req.body;     
      const { uid } = req.user.uid;
      const respone = await db.collection(`${HistoryPaths.common}_${uid}`).add(data);      
      res.json({
        history_id: respone.id,
        ...respone.data,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getRecords: async (req, res) => {
    try {
      const { uid } = req.user.uid;
      const snapshot = await db.collection(`${HistoryPaths.common}_${uid}`).orderBy("timestamp", "desc").get();
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}