
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, doc, getDoc, query, where } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCw5_zK8ys74PzekOMN5obq1tIRFO3b00A",
  authDomain: "vanlife-838bb.firebaseapp.com",
  projectId: "vanlife-838bb",
  storageBucket: "vanlife-838bb.appspot.com",
  messagingSenderId: "106338087549",
  appId: "1:106338087549:web:6347f082883686bad4f714"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vanCollectionRef = collection(db, "van")


export async function getVans() {
    const querySnapshot = await getDocs(vanCollectionRef)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}

export async function getVan(id) {
    const docRef = doc(db, "van", id)
    const vanSnapshot = await getDoc(docRef)

    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans() {
    const q = query(vanCollectionRef, where("hostId", "==", 789))
    const querySnapshot = await getDocs(q)
    const dataArr = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log(dataArr)
    return dataArr
}


// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}