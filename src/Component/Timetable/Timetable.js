import './Timetable.css';
import { auth } from '../../Database/firebase';
import firestore from '../../Database/firebase';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Timetable(){
    const Register = firestore.collection('Register');
    const [table, setTable] = useState(null);
    const [sub, setSub] = useState('');
    const [name, setName] = useState('');
    console.log(sub)

    useEffect(() =>{
        auth.onAuthStateChanged((user) =>{
            const name = user.displayName;
            Register.doc(user.uid).get().then((result) =>{
                const table = result.data().Tablesub;
                const sub = result.data().subjectregis;
                setTable(table);
                setSub(sub);
                setName(name);
            })
        })
    },[])
    
    return(
        <>
        { table == true ? (
            <div className="container-timetable">
                <div className="text-table">
                    <h1>ตารางเรียน</h1>
                    <span>{name}</span>
                </div>
                <div className="tablesub">
                    <div className="tablesub-box">
                        { sub && sub.map((data) =>{
                            return(
                                <div className="Subject">
                                    <div className="Id-sub">{data.Id}</div>
                                    <div className="Name-sub">{data.Name}</div>
                                    <div className="Time-sub">{data.Time}</div>
                                    <div className="Sec-sub">{data.Sec}</div>
                                    <div className="Room-sub">{data.Room}</div>
                                    <div className="Teacher-sub">{data.Teacher}</div>
                                </div>
                            )
                        }) }
                    </div>
                </div>
            </div>
        ) : (
            <div className="container-text-timetable">
                <div className="text-timetable">
                    <h1>คลิกเพื่อลงทะเบียนเรียน</h1>
                </div>
                <Link to="/enroll" className="btn-backtoregister" >
                    <span>ลงทะเบียนเรียน</span>
                </Link>
            </div>
        ) }
        </>
    );
}

export default Timetable;