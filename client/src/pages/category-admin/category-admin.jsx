import React, { useContext, useEffect, useState } from 'react';
import TopNavAdmin from './../../components/top-nav-admin/top-nav-admin';
import SideBarAdmin from './../../components/sidebar-admin/sidebar-admin';
import './stylesheets/category-admin.scss';
import {Validator} from './../../utils/validation';
import { CateContext } from '../../contexts/categoryContext';

CategoryAdmin.propTypes = {};

const initialCategory = {categoryID: "", categoryName: ""};

function CategoryAdmin(props) {
    const { 
            cateState: {categories}, 
            getCategories, 
            addCategory, 
            updateCategory,
            deleteCategory
        } = useContext(CateContext);

    const [category, setCategory] = useState(initialCategory);
    const [cateResID, setCateResID] = useState('');
    const [editStatus, setEditStatus] = useState(false);
    const [messageResult, setMessageResult] = useState({success: false, message: ''});
    
    const handleChange = (e) =>{
        e.preventDefault();
        if(messageResult.message !== '') setMessageResult({});
        let {name, value} = e.target;
        setCategory({...category, [name]: value});
    }
    const editCategory =  (id, category) =>{
        setCateResID(id);
        setCategory(category);
        setEditStatus(true);
        setMessageResult({});
    }
    const removeCategory = async (id) => {
        try {
            const res = await deleteCategory(id);
        } catch (error) {
            console.log(error)
        }
    }
    const onHandleCancel = () =>{
        setCategory(initialCategory);
        setEditStatus(false);
    }
    //console.log(category)
    useEffect(()=>{
        getCategories()
    }, [])
    useEffect(()=>{
        Validator({
            form: '#modal-form',
            formGroupSelector: '.modal-form-group',
            errorSelector: '.form-message',
            rules: [
                Validator.isRequired('#categoryID', 'Mã danh mục không được để trống'),
                Validator.isRequired('#categoryName', 'Tên danh mục không được để trống')
            ],
            onSubmit: async function (data) {
                let resData = {};console.log(editStatus)
                try {
                    if(editStatus){
                        const res = await updateCategory(cateResID, data);
                        resData = res;

                    }else{
                        const res = await addCategory(data);
                        resData = res;
                    }

                    if(resData) setMessageResult({
                        success: resData.success, 
                        message: resData.message
                    })
                    if(resData.success === true) {
                        setCategory(initialCategory);
                        setEditStatus(false);
                    };
                } catch (error) {
                    console.log(error)
                }
            }
        })
    },[cateResID, editStatus])//phải truyền tham số để reload lại useEffect giúp cập nhật state vào trong submit
    return (
        <div className="app">
            <title>Admin | Danh mục sản phẩm</title>
            <TopNavAdmin />
            <SideBarAdmin {...props}/>
            <div className="wrapper">
                <div className="category-admin-wrapper">
                    <div className="category-admin category-admin-left">
                        { !editStatus ? 
                            <div className="category-title"><i className="fas fa-plus"></i>Thêm danh mục</div> : 
                            <div className="category-title"><i className="fas fa-edit"></i>Cập nhật danh mục</div>
                        }
                        <div className="category-form">
                            <form id="modal-form" 
                                //onSubmit={onHandleCategory}
                            >
                                <div className="category-form-group modal-form-group">
                                    <label htmlFor="categoryID">Mã danh mục</label>
                                    <input type="text" name="categoryID" id="categoryID" 
                                    value={category.categoryID} onChange={handleChange}/>
                                    <span className="form-message"></span>
                                </div>
                                <div className="category-form-group modal-form-group">
                                    <label htmlFor="categoryName">Tên danh mục</label>
                                    <input type="text" name="categoryName" id="categoryName" 
                                    value={category.categoryName} onChange={handleChange}/>
                                    <span className="form-message"></span>
                                </div>
                                <div className="category-form-group message-box">
                                    {
                                        <span 
                                            className={`message-result ${messageResult.success ? '--success' : '--error'}`}
                                        >
                                            {messageResult.message}
                                        </span>
                                    }
                                    
                                </div>
                                <div className="category-button">
                                    <button className="btn btn--green cate-btn" type="submit">
                                        {`${!editStatus ? 'Thêm' : 'Cập nhật'}`}
                                    </button>
                                    {editStatus ? <button className="btn btn--red cate-btn --red" onClick={onHandleCancel}>Hủy</button> : ''}
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="category-admin category-admin-right">
                        <div className="category-title">
                            Danh sách danh mục
                        </div>
                        <div className="category-right-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Mã danh mục</th>
                                        <th>Tên danh mục</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map((category, index)=>{
                                            return <tr key={index}>
                                                        <td>{category.categoryID}</td>
                                                        <td>{category.categoryName}</td>
                                                        <td>
                                                            <span 
                                                                onClick={()=>editCategory(category._id, category)}
                                                            >Cập nhật
                                                            </span>
                                                            <span
                                                                onClick={()=>removeCategory(category._id)}
                                                            >Xóa</span>
                                                        </td>
                                                    </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryAdmin;