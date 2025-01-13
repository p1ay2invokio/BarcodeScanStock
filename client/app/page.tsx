'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import axios, { all } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ip } from '../../config'

export default function Home() {

  const [barcode, setBarcode] = useState<any>('')
  const [product, setProduct] = useState<any>(null)
  const [updateValue, setUpdateValue] = useState<string>('')
  const [allLogs, setAllLogs] = useState<[]>([])
  const [refresh, setRefresh] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)

  const main_input = useRef<any>(null)
  const modal_input = useRef<any>(null)

  // const Scan

  const getProduct = (barcode: string) => {
    axios.get(`${ip}/api/product/${barcode}`).then((res) => {
      console.log(res.data)
      setProduct(res.data)
      setUpdateValue(res.data[0].qty.toString())
      main_input.current.blur();
    })
  }

  const updateProduct = (barcode: string, qty: any) => {
    axios.patch(`${ip}/api/update_quantity`, {
      barcode: product[0].barcode,
      name: product[0].name,
      current: product[0].qty,
      qty: qty
    }).then((res) => {
      console.log(res.data)
      setProduct(null)
      setBarcode('')
      main_input.current.value = ''
      main_input.current.focus();
      setRefresh(!refresh)
      toast('อัพเดทข้อมูลสำเร็จ', { type: 'success' })
    })
  }

  const getLogs = () => {
    axios.get(`${ip}/api/logs`).then((res) => {
      console.log(res.data)
      setAllLogs(res.data)
    })
  }

  const checkFocus = () => {
    if (document.activeElement === main_input.current) {
      setFocus(true);
    } else {
      setFocus(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect focus changes on the document
    document.addEventListener("focusin", checkFocus);
    document.addEventListener("click", checkFocus);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("focusin", checkFocus);
      document.removeEventListener("click", checkFocus);
    };
  }, []);

  useEffect(() => {
    getLogs()
  }, [refresh])



  return (
    <div onClick={(e) => {
      if (e.target == e.currentTarget) {
        main_input.current.focus()
      }
    }} className="w-full h-[100vh] flex justify-center items-center flex-col">

      {product && product.length > 0 ? <div className="w-full h-[100vh] bg-black/40 fixed top-0 left-0 flex justify-center items-center">
        <div className="w-[300px] h-[450px] bg-white rounded-[8px] flex flex-col justify-center items-center">
          <p>{product[0].name}</p>
          <p className="text-[12px] text-gray-400">{product[0].barcode}</p>
          <input disabled onChange={(e) => {
            setUpdateValue(e.target.value)
          }} className="text-center mt-[20px] text-[20px] mb-[20px]" value={updateValue}></input>
          <button onClick={() => {
            updateProduct(product[0].barcode, updateValue)
          }} className='w-[90%] h-[50px] bg-blue-400 text-white'>อัพเดท</button>

          <div className="grid grid-cols-3 w-full text-white mt-[10px]">
            <div onClick={() => {
              setUpdateValue(updateValue + '1')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>1</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '2')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>2</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '3')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>3</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '4')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>4</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '5')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>5</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '6')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>6</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '7')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>7</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '8')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>8</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '9')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>9</p>
            </div>
            <div onClick={() => {
              setUpdateValue(updateValue + '0')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>0</p>
            </div>
            <div onClick={(e) => {
              setUpdateValue(updateValue.slice(0, updateValue.length - 1))
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>x</p>
            </div>
            <div onClick={(e) => {
              setUpdateValue('')
            }} className="bg-gray-700 h-[50px] flex justify-center items-center active:bg-gray-500">
              <p>RESET</p>
            </div>
          </div>

          <div onClick={() => {
            setProduct(null)
            setBarcode('')
            main_input.current.value = ''
            main_input.current.focus();
          }} className="w-[200px] h-[40px] bg-red-500 flex justify-center items-center text-white mt-[10px]">
            <p>ยกเลิก</p>
          </div>
        </div>
      </div> : null}

      <input ref={main_input} onChange={(e) => {
        setTimeout(() => {
          getProduct(e.target.value)
          setBarcode(e.target.value)
        }, 300)
      }} className="border-[1px] border-black rounded-[8px] p-[10px] text-black text-center" autoFocus placeholder="บาร์โค้ด"></input>

      {focus ? <p className="text-green-700 mt-[10px]">พร้อมแสกนบาร์โค้ด</p> : <p className="text-orange-700 mt-[10px]">โปรดแตะที่หน้าจอ 1 ครั้ง</p>}

      <div className="w-[350px] h-[250px] overflow-scroll mt-[20px]">
        <table className="w-full mt-[10px] h-[10px]">
          <thead>
            <tr className="bg-slate-800 text-white text-center">
              <td>ชื่อ</td>
              <td className="bg-red-600">เก่า</td>
              <td className="bg-green-600">ใหม่</td>
              <td>เวลา</td>
              <td className="bg-green-600">+</td>
            </tr>
          </thead>
          <tbody>
            {allLogs && allLogs.length > 0 ? allLogs.map((item: any, index: number) => {

              let time = new Date(Number(item.timestamp)).toLocaleString("th-TH")

              return (
                <tr className={index % 2 == 0 ? 'bg-gray-200' : 'bg-gray-300'} key={index}>
                  <td><div>
                    <p>{item.name}</p>
                    <p className="text-[12px] text-gray-500">{item.barcode}</p>
                  </div></td>
                  <td className="text-center font-bold">{item.old_qty}</td>
                  <td className="text-center font-bold">{item.new_qty}</td>
                  <td className="text-center">{time}</td>
                  <td className="text-center font-bold text-green-600">{item.new_qty - item.old_qty}</td>
                </tr>
              )
            }) : null}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}
