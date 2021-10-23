import './Timetable.css';
import { auth } from '../../Database/firebase';
import firestore from '../../Database/firebase';
import { useEffect, useState } from 'react';

function Timetable(){
    const Register = firestore.collection('Register');
    const [table, setTable] = useState(null);
    const [sub, setSub] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    console.log(loading)

    useEffect(() =>{
        auth.onAuthStateChanged((user) =>{
            const name = user.displayName;
            Register.doc(user.uid).get().then((result) =>{
                const table = result.data().Tablesub;
                const sub = result.data().subjectregis;
                setTable(table);
                setSub(sub);
                setName(name);
                setLoading(false);
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
                <div className="Header-box">
                    <div className="header">
                        <div className="Id-sub"><span>รหัสวิชา</span></div>
                        <div className="Name-sub"><span>ชื่อวิชา</span></div>
                        <div className="Credit-sub"><span>หน่วยกิจ</span></div>
                        <div className="Time-sub"><span>เวลาเรียน</span></div>
                        <div className="Sec-sub"><span>Section</span></div>
                        <div className="Room-sub"><span>ห้องเรียน</span></div>
                        <div className="Teacher-sub"><span>อาจารย์</span></div>
                    </div>
                </div>
                <div className="tablesub">
                    <div className="tablesub-box">
                        { sub && sub.map((data) =>{
                            return(
                                <>
                                    <div className="Subject">
                                        <div className="Id-sub-c"><span>{data.Id}</span></div>
                                        <div className="Name-sub-c"><span>{data.Name}</span></div>
                                        <div className="Credit-sub-c"><span>{data.Credit}</span></div>
                                        <div className="Time-sub-c"><span>{data.Time}</span></div>
                                        <div className="Sec-sub-c"><span>{data.Sec}</span></div>
                                        <div className="Room-sub-c"><span>{data.Room}</span></div>
                                        <div className="Teacher-sub-c"><span>{data.Teacher}</span></div>
                                    </div>
                                </>
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
                <a href="/enroll" className="btn-backtoregister">
                    <span>ลงทะเบียนเรียน</span>
                </a>
            </div>
        ) }
        </>
    );
}

export default Timetable;