import React, { useState, useEffect } from "react";
import { Sidebar } from "../../components/Sidebar";
import { Button, Input, Select, Spinner, Alert, AlertIcon } from "@chakra-ui/react"; 
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config/config";
import { getAuth, updateProfile } from "firebase/auth";

export const Account = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [windZone, setWindZone] = useState("windzone1");
  const [thermalZone, setThermalZone] = useState("thermalzone1");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState(""); // State for new password
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName || "");
          setLastName(userData.lastName || "");
          setMobileNumber(userData.mobileNumber || "");
          setEmail(userData.email || "");
          setWindZone(userData.windZone || "windzone1");
          setThermalZone(userData.thermalZone || "thermalzone1");
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      setLoading(true);
      setSuccessMessage(""); // Clear success message on new update
      setErrorMessage(""); // Clear previous error messages
      try {
        // Update Firestore user document
        await updateDoc(userRef, {
          firstName,
          lastName,
          mobileNumber,
          email,
          windZone,
          thermalZone,
        });

        // Update Firebase Authentication profile (displayName)
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`, // Update displayName to full name
        });

        // If mobileNumber is changed, you may want to update it in the Firebase Auth
        // Note: Updating the phone number requires reauthentication.
        // You can implement the reauthentication process here.
        console.log("User details updated successfully!");
        setSuccessMessage("Profile updated successfully!"); // Set success message
      } catch (error) {
        console.error("Error updating user details: ", error);
        setErrorMessage("Error updating profile. Please try again."); // Show error message
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex gap-2 sm:grid sm:pb-5">
      <Sidebar pageName={"Account"} />
      <div className="w-[84%] px-2 sm:w-full">
        <div className="border-b-2 border-black pb-2">
          <p className="text-2xl font-bold">Account</p>
        </div>
        <p className="mt-4 font-bold text-xl">Account Information</p>

        {successMessage && ( // Display success message if it exists
          <Alert status="success" borderRadius="md" mb={4}>
            <AlertIcon />
            {successMessage}
          </Alert>
        )}
        
        {errorMessage && ( // Display error message if it exists
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            {errorMessage}
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-5 w-[60%] xl:w-[80%] sm:w-full">
          <div>
            <p className="font-semibold text-sm">First Name *</p>
            <Input 
              placeholder="First Name" 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <p className="font-semibold text-sm">Last Name *</p>
            <Input 
              placeholder="Last Name" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <p className="font-semibold text-sm">Mobile Number</p>
            <Input 
              placeholder="Mobile Number" 
              type="number" 
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <p className="font-semibold text-sm">Email</p>
            <Input 
              placeholder="Email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <p className="font-bold text-2xl mt-5">Default Selections</p>
        <div className="grid grid-cols-2 gap-5 mt-5 w-[60%] xl:w-[80%] sm:w-full">
          <div>
            <p className="font-semibold text-sm ">Windzone</p>
            <Select 
              value={windZone}
              onChange={(e) => setWindZone(e.target.value)}
            >
              <option value="windzone1">Wind Zone 1</option>
              <option value="windzone2">Wind Zone 2</option>
              <option value="windzone3">Wind Zone 3</option>
            </Select>
          </div>
          <div>
            <p className="font-semibold text-sm ">Thermal zone</p>
            <Select 
              value={thermalZone}
              onChange={(e) => setThermalZone(e.target.value)}
            >
              <option value="thermalzone1">Thermal Zone 1</option>
              <option value="thermalzone2">Thermal Zone 2</option>
              <option value="thermalzone3">Thermal Zone 3</option>
            </Select>
          </div>
        </div>
        <div className="w-[30%] xl:w-[40%] sm:w-[80%]">
          <p className="font-bold text-2xl mt-5">Password</p>
          <p className="font-semibold text-sm mt-2">
            Enter new password to update
          </p>
          <Input 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Handle password change
          />
        </div>
        <Button 
          colorScheme="orange" 
          marginTop={"20px"}
          onClick={handleUpdate} // Call handleUpdate on button click
          isLoading={loading} // Show loading state
        >
          {loading ? "Updating..." : "Update"}
        </Button>
      </div>
    </div>
  );
};
