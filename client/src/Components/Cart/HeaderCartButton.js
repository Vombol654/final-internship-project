import CartIcon from "./CartIcon";
import '../../Styles/headerCartButton.css'
const HeaderCartButton=()=>{
    return(
<button className="button cart">
      <span className='icon'>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">0</span>
    </button>
    )
}
export default HeaderCartButton;