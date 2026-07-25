import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/dashboard/Dashboard";

// Employee
import EmployeeList from "./pages/employee/EmployeeList";
import AddEmployee from "./pages/employee/AddEmployee";
import EditEmployee from "./pages/employee/EditEmployee";
import EmployeeDetails from "./pages/employee/EmployeeDetails";
import EmployeeView from "./pages/employee/EmployeeView";

// Pre Joining
// Pre Joining
import PreJoining from "./pages/prejoining/PreJoining";
import AddPreJoining from "./pages/prejoining/AddPreJoining";
import ViewPreJoining from "./pages/prejoining/ViewPreJoining";
import EditPreJoining from "./pages/prejoining/EditPreJoining";
// Documents
import Documents from "./pages/documents/Documents";
import DocumentUpload from "./pages/documents/DocumentUpload";
import ViewDocument from "./pages/documents/ViewDocument";
import EditDocument from "./pages/documents/EditDocument";

// Accommodation
import Accommodation from "./pages/accommodation/Accommodation";
import AddAccommodation from "./pages/accommodation/AddAccommodation";
import EditAccommodation from "./pages/accommodation/EditAccommodation";
import ViewAccommodation from "./pages/accommodation/ViewAccommodation";

// Transportation
import Transportation from "./pages/transportation/Transportation";
import AddTransportation from "./pages/transportation/AddTransportation";
import EditTransportation from "./pages/transportation/EditTransportation.jsx";
import ViewTransportation from "./pages/transportation/ViewTransportation";

// IT Assets
import ITAssets from "./pages/itassets/ITAssets";
import AddITAsset from "./pages/itassets/AddITAsset";
import EditITAsset from "./pages/itassets/EditITAsset";
import ViewITAsset from "./pages/itassets/ViewITAsset";

// Notification
import NotificationList from "./pages/notification/NotificationList";
import AddNotification from "./pages/notification/AddNotification";
import EditNotification from "./pages/notification/EditNotification";
import ViewNotification from "./pages/notification/ViewNotification";
import NotificationForm from "./pages/notification/NotificationForm";

// Other
import Analytics from "./pages/analytics/Analytics";
import HelpCenter from "./pages/helpcenter/HelpCenter";
//import PolicyList from "./pages/policy/PolicyList";
//import ViewPolicy from "./pages/policy/ViewPolicy";

// Policy
import PolicyList from "./pages/policy/PolicyList";
import AddPolicy from "./pages/policy/AddPolicy";
import EditPolicy from "./pages/policy/EditPolicy";
import ViewPolicy from "./pages/policy/ViewPolicy";
import PageNotFound from "./pages/errors/PageNotFound";
import IDCardList from "./pages/idcard/IDCardList";

import IDCardForm from "./pages/idcard/IDCardForm";

import ViewIDCard from "./pages/idcard/ViewIDCard";
import HelpList from "./pages/help/HelpList";
import HelpForm from "./pages/help/HelpForm";

import EditIDCard from "./pages/idcard/EditIDCard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Login */}

        {/* Authentication */}

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Employee */}
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/employee/view/:id" element={<EmployeeView />} />
          {/* Pre Joining */}
          {/* Pre Joining */}
          <Route path="/prejoining" element={<PreJoining />} />
          <Route path="/prejoining/add" element={<AddPreJoining />} />
          <Route path="/prejoining/view/:id" element={<ViewPreJoining />} />
          <Route path="/prejoining/edit/:id" element={<EditPreJoining />} />
          {/* Documents */}
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/upload" element={<DocumentUpload />} />
          <Route path="/documents/view/:id" element={<ViewDocument />} />
          <Route path="/documents/edit/:id" element={<EditDocument />} />
          {/* Accommodation */}
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/add" element={<AddAccommodation />} />
          <Route
            path="/accommodation/edit/:id"
            element={<EditAccommodation />}
          />
          <Route
            path="/accommodation/view/:id"
            element={<ViewAccommodation />}
          />
          {/* Transportation */}
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/transportation/add" element={<AddTransportation />} />
          <Route
            path="/transportation/edit/:id"
            element={<EditTransportation />}
          />
          <Route
            path="/transportation/view/:id"
            element={<ViewTransportation />}
          />
          {/* IT Assets */}
          <Route path="/itassets" element={<ITAssets />} />
          <Route path="/itassets/add" element={<AddITAsset />} />
          <Route path="/itassets/edit/:id" element={<EditITAsset />} />
          <Route path="/itassets/view/:id" element={<ViewITAsset />} />
          {/* Notification */}
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/notification/add" element={<AddNotification />} />
          <Route path="/notification/edit/:id" element={<EditNotification />} />
          <Route path="/notification/view/:id" element={<ViewNotification />} />
          <Route path="/notifications/create" element={<NotificationForm />} />
          {/* Other Pages */}
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/helpcenter" element={<HelpCenter />} />
          {/* Policy */}
          <Route path="/policy" element={<PolicyList />} />
          <Route path="/policy/add" element={<AddPolicy />} />
          <Route path="/policy/edit/:id" element={<EditPolicy />} />
          <Route path="/policy/view/:id" element={<ViewPolicy />} />
          <Route path="/help" element={<HelpList />} />
          <Route path="/help/create" element={<HelpForm />} />
          // ====================== // ID CARD MODULE // ======================
          <Route path="/idcard" element={<IDCardList />} />
          <Route path="/idcard/create" element={<IDCardForm />} />
          <Route path="/idcard/view/:id" element={<ViewIDCard />} />
          <Route path="/idcard/edit/:id" element={<EditIDCard />} />
          {/* 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

export default App;
