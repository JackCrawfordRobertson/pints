import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PubDetailsPanel from "./PubDetailsPanel";
import EditPubPanel from "./EditPubPanel";
import { toast } from "react-toastify";
import { setDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore"; // Ensure serverTimestamp is imported
import { firestore } from "../../../../config/firebaseConfig";
import { getAuth } from "firebase/auth";
import "@/app/styles/animations.css"; // Ensure you have CSS for transitions

const SlideUpPanel = ({ pub, isVisible, onClose }) => {
  const [updatedData, setUpdatedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [showNonEdit, setShowNonEdit] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const currentPub = pub;

  const logPubClick = async (pubId, userId) => {
    if (!pubId || !userId) {
      console.error("pubId or userId is missing");
      return;
    }
  
    try {
      await setDoc(doc(firestore, "pub_clicks", `${userId}_${pubId}`), {
        pubId,
        userId,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error logging pub click:", error);
    }
  };

  useEffect(() => {
    if (user && currentPub?.id) {
      logPubClick(currentPub.id, user.uid);
    } else {
      console.error("currentPub.id or user.uid is missing");
    }
  }, [currentPub, user]);

  const handleTakeMeButtonClick = () => {
    const coords = `${currentPub.latitude},${currentPub.longitude}`;
    navigator.clipboard
      .writeText(coords)
      .then(() => {
        toast.success("Address copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        toast.error("Failed to copy address.");
      });
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSaveChanges = async () => {
    if (!user) {
      toast.error("You must be logged in to update pub information.");
      return;
    }

    try {
      const pubDoc = doc(firestore, "pubs", currentPub.id);
      await updateDoc(pubDoc, updatedData);
      toast.success("Pub information updated successfully!");
      setEditMode(false);
      setShowNonEdit(true);
      setShowEdit(false);
    } catch (error) {
      console.error("Error updating pub information:", error);
      toast.error("Failed to update pub information.");
    }
  };

  const handleUpdateClick = () => {
    setShowNonEdit(false);
    setTimeout(() => {
      setEditMode(true);
      setShowEdit(true);
    }, 300);
  };

  const handleCancelClick = () => {
    setShowEdit(false);
    setTimeout(() => {
      setEditMode(false);
      setShowNonEdit(true);
    }, 300);
  };

  return (
    <TransitionGroup>
      {showNonEdit && (
        <CSSTransition key="nonEdit" timeout={300} classNames="fade">
          <PubDetailsPanel
            currentPub={currentPub}
            isVisible={isVisible}
            onClose={onClose}
            handleTakeMeButtonClick={handleTakeMeButtonClick}
            handleUpdateClick={handleUpdateClick}
            user={user}
          />
        </CSSTransition>
      )}
      {showEdit && (
        <CSSTransition key="edit" timeout={300} classNames="fade">
          <EditPubPanel
            currentPub={currentPub}
            isVisible={isVisible}
            handleInputChange={handleInputChange}
            handleSaveChanges={handleSaveChanges}
            handleCancelClick={handleCancelClick}
          />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

export default SlideUpPanel;