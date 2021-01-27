import { useSelector } from "react-redux";
const MngrHomeView = () => {

    const userName = useSelector((state) => state.userReducer.user.name);
    return ( 

        <h2>Welcome {userName}</h2>
     );
}
 
export default MngrHomeView;

  