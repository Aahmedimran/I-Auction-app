import ActionTypes from "./actionTypes";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Auction = (
  Name,
  price,
  discription,
  selectedValue,
  imageUpload,
  id,
  Categary
) => {
  console.log("🚀 ~ file: action.js:23 ~ Categary", Categary)
  return (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    const imageRef = ref(
      storage,
      `images/${imageUpload.name + new Date().getTime()}`
    );
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(ref(storage, `${snapshot.metadata.fullPath}`)).then(
        async (url) => {
          try {
            const docRef = await addDoc(collection(db, "auctionItems"), {
              Name: Name,
              price: price,
              discription: discription,
              type: selectedValue,
              file: url,
              userId: id,
              Categary:Categary,
              isBid: false,
              confirmBid: false,
            });

            dispatch({
              type: ActionTypes.Auction_Create_SUCCESS,
              payload: docRef.id,
            });

            console.log("🚀 ~ docRef", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
            dispatch({
              type: ActionTypes.Auction_Create_FAIL,
            });
          }
        }
      );
    });
  };
};

export const getAuction = () => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Auction_Create_LOADING,
    });
    try {
      const querySnapshot = await getDocs(collection(db, "auctionItems"));
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ id: doc.id, product: doc.data() });
      });
      dispatch({
        type: ActionTypes.Auction_Get_SUCCESS,
        payload: [...temp],
      });
      // dispatch(getAuction());
    } catch (e) {
      console.log(e, "error");
      dispatch({
        type: ActionTypes.Auction_Get_FAIL,
      });
    }
  };
};

export const deleteAuction = (id) => {
  console.log("🚀 ~ file: action.js:90 ~ deleteAuction ~ id", id);
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.delete_Auction_LOADING,
    });
    try {
      const docRef = await doc(db, "auctionItems", id);
      deleteDoc(docRef);
      console.log("deleteAuction");
      dispatch({
        type: ActionTypes.delete_Auction_SUCCESS,
      });
    } catch (e) {
      console.log(e, "error");
      dispatch({
        type: ActionTypes.delete_Auction_FAIL,
      });
    }
  };
};

export const createBid = (id, price) => {
  console.log("🚀 ~ file: action.js:109 ~ createBid ~ price", price);

  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Bid_Create_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      // await updateDoc(docRef, {
      //   isBid: true,
      //   bidder: [...{ bidderId: localStorage.getItem("User"), bidPrice: price }],
      // });
      // Update the document with the new data and merge with existing data
      // const docRef = db.collection("auctionItems").doc("myDocument");
      const data = {isBid: true,
        bidderId: localStorage.getItem("User"),
        bidPrice: price}
        setDoc(docRef,data, { merge: true })
      // await docRef.setDoc({
      //   isBid: true,
      //   bidderId: localStorage.getItem("User"),
      //   bidPrice: price,
      // });
      dispatch({
        type: ActionTypes.Bid_Create_SUCCESS,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      dispatch({
        type: ActionTypes.Bid_Create_FAIL,
      });
    }
  };
};

export const deleteBid = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ActionTypes.Cancel_Bid_LOADING,
    });
    try {
      const docRef = doc(db, "auctionItems", id);
      await updateDoc(docRef, {
        isBid: true,
      });

      dispatch({
        type: ActionTypes.Cancel_Bid_SUCCESS,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
      dispatch({
        type: ActionTypes.Cancel_Bid_FAIL,
      });
    }
  };
};
