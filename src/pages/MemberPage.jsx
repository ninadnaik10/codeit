import React, { useState, onChange, useEffect } from "react";
import { Link, useLocation, useParams } from 'react-router-dom';
import '../styles/adminLanding.css';
import Navbar from "../components/navbar/navbar";
import { db } from '../utilities/firebase'
import { doc, getDocs, getDoc } from 'firebase/firestore'
import { useStateWithCallbackLazy } from "use-state-with-callback";
import CreateQuestion from "../components/CreateQuestion";
import '../styles/creategroup.css'
import ProblemInSelection from "../components/ProblemInSelection";
import { collection, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';



export default function MemberPage(props) {
    const navigate = useNavigate();

    const [isGroupVisible, setGroupVisible] = useState(false)
    const handleGroup = () => {
        setGroupVisible(!isGroupVisible)
    };
    // const [, forceRender] = useState(undefined);
    const [group, setGroup] = useStateWithCallbackLazy({
        name: "",
        description: "",
        problems: [],
        members: [],
        membersName: []
    })
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        console.log(props.id)
        // debugger

        const fetchGroup = async () => {
            const docRef = doc(db, "groups", props.id);
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data())
            setGroup({
                name: docSnap.data().name,
                description: docSnap.data().description,
                members: docSnap.data().participantsUid,
                membersName: []
            })
            // problems: docSnap.data().problems,
            // members: docSnap.data().members
            // }, (group2) => {
            //     const fetchUsername = async () => {
            //         const names = [];
            //         for (const member of group2.members) {
            //             console.log(member)
            //             const docRef = doc(db, "users", member);
            //             const docSnap = await getDoc(docRef);
            //             console.log(docSnap.data());
            //             // debugger
            //             names.push(docSnap.data().name);
            //         }
            //         console.log(names);
            //         setGroup({...group2, membersName: names});

            //     }

            //     fetchUsername()

        }
        fetchGroup()

        const fetchQuestions = async () => {
            // const querySnapshot = await getDocs(collection(db, "groups", props.id, "problems"));
            // // console.log(querySnapshot)
            // // debugger
            // const docs = querySnapshot.docs.map(doc => doc)
            // setQuestions(docs)
            // console.log(docs)

            const querySnapshot = await getDocs(collection(db, "groups", props.id, "test"));
            // console.log(querySnapshot)
            // debugger
            const docs = querySnapshot.docs.map(doc => doc)
            setQuestions(docs)
            console.log(docs)
        }
        fetchQuestions()
    }, [])

    useEffect(() => {
        // This will show the updated user state in the console
        console.log(group);
    }, [group]);


    const handleTestClick = (id) => {

        console.log("idddd ", id)
        console.log(props.id)

        // navigate(`/test/${id}`,{state:{groupid:props.id}})


        navigate(`/test/${id}`,
            {
                state: { gid: props.id }
            })


    }




    return (<>
        {isGroupVisible && <CreateQuestion boolState={isGroupVisible} changeBoolState={setGroupVisible} />}
        <div>

            <Navbar />
            <div className="header-container">
                <div className="namedesc">
                    {/* <button onClick={fetchGroup}>ijgrviuewrhgw</button> */}
                    <p className="gname">{group.name}</p>
                    <p className="description">{group.description}</p>
                </div>
                <div className="header-buttons">
                    {/* <button className="action-buttons" onClick={handleGroup}>Add Problem</button>
                    <button className="action-buttons">View Problem</button> */}
                </div>
            </div>

            <div className="main-container">
                {/* <div className="problem">
                    <p className="topic">Problems</p>
                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Two number sum</h2>
                            <p className='problem-description'>Given An Array Of Integers, Find Two Numbers Such That They Add Up To A Specific Target Number. You May Assume That Each Input Would Have Exactly One Solution And You May Not Use The Same Element Twice In The Result.</p>
                            <p>2E3VWKv7owQXswbSf7wS</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Valid Sudoku</h2>
                            <p className='problem-description'>Determine If A 9x9 Sudoku Board Is Valid. Only The Filled Cells Need To Be Validated According To The Following Rules: Each Row Must Contain The Digits 1-9 Without Repetition. Each Column Must Contain The Digits 1-9 Without Repetition. Each Of The 9 3x3 Sub-Grids Of The Grid Must Contain The Digits 1-9 Without Repetition.</p>
                            <p>375eRchFzcN0ruaf0vzt</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>

                    <div className='flex problemrow1'>
                        <div className='problem-left'>
                            <h2>Merge Sorted Lists</h2>
                            <p className='problem-description'>Merge Two Sorted Linked Lists And Return It As A New Sorted List. The New List Should Be Made By Splicing Together The Nodes Of The First Two Lists.</p>
                            <p>3RE84rinlItXAqS0qkqJ</p>
                        </div>
                        <div className='problem-right flex'>
                            <button className="submit">Solve Now!</button>
                        </div>
                    </div>
                </div> */}

                <div className="member">
                    <p className="topic">Solve Problems</p>
                    <div className="table-container">
                        {questions.map((doc) => {
                            // console.log(doc.id)
                            //   return  <ProblemInSelection id={doc.id} classname='problemrow' title={doc.data().name} difficulty='easy' description={doc.data().description} testcases={doc.data().testcases}/>

                            return <>

                                <div>
                                    <div>
                                        {doc.data().name}
                                    </div>
                                    <div>
                                        {doc.data().testDescription}
                                    </div>
                                    <button onClick={() => { handleTestClick(doc.id) }}>Give Test</button>
                                </div>
                            </>
                        })}
                    </div>
                </div>
            </div>
        </div></>
    )
}