import './stylesheets/base.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import DashboardAdmin from './components/dashboard-admin/dashboard-admin';
import ProductAdmin from './pages/product-admin/product-admin';
import CategoryAdmin from './pages/category-admin/category-admin';
import DiscountAdmin from './pages/discount-admin/discount-admin';
import LoginAdmin from './pages/login-admin/login-admin';
import OrderAdmin from './pages/order-admin/order-admin';
import MessageAdmin from './pages/message-admin/message-admin';
import Page404 from './pages/page404/page404';
import AuthContextProvider from './contexts/authContext';
import ProtectedRoute from './components/routing/protectedRoute';
import CateContextProvider from './contexts/categoryContext';
import ProductContextProvider from './contexts/productContext';
import CartContextProvider from './contexts/cartContext';
import ReviewContextProvider from './contexts/reviewContext';
import HistoryContextProvider from './contexts/historyContext';
import OrderContextProvider from './contexts/orderContext';
import SocketContextProvider from './contexts/socketContext';
import NotiContextProvider from './contexts/notificationContext';
import MessageContextProvider from './contexts/messageContext';
import NormalRoute from './components/routing/normalRoute';

function App() {
    return (
        <AuthContextProvider>
        <CateContextProvider>
        <ProductContextProvider>
        <ReviewContextProvider>
        <CartContextProvider>
        <SocketContextProvider>
        <HistoryContextProvider>
        <OrderContextProvider>
        <NotiContextProvider>
        <MessageContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route path="/admin/login" component={LoginAdmin}/>
                    <Route path="/admin/404" component={Page404}/>
                    <ProtectedRoute path="/admin" exact render={(props)=>{
                        return <DashboardAdmin {...props}/>
                    }}/>
                    <ProtectedRoute path="/admin/product" exact render={(props)=>{
                        return <ProductAdmin {...props}/>
                    }}/>
                    <ProtectedRoute path="/admin/category" exact render={(props)=>{
                        return <CategoryAdmin {...props}/>
                    }}/>
                    <ProtectedRoute path="/admin/discount" exact render={(props)=>{
                        return <DiscountAdmin {...props}/>
                    }}/>
                    <ProtectedRoute path="/admin/order" exact render={(props)=>{
                        return <OrderAdmin {...props}/>
                    }}/>
                    <ProtectedRoute path="/admin/message" exact render={(props)=>{
                        return <MessageAdmin {...props}/>
                    }}/>
                    {/* Nên ưu tiên cho route admin trước */}
                    <Route path="/" component={NormalRoute}/>
                </Switch>
            </BrowserRouter>
        </MessageContextProvider>
        </NotiContextProvider>
        </OrderContextProvider>
        </HistoryContextProvider>
        </SocketContextProvider>
        </CartContextProvider>
        </ReviewContextProvider>
        </ProductContextProvider>
        </CateContextProvider>
        </AuthContextProvider>
    );
}

export default App;
