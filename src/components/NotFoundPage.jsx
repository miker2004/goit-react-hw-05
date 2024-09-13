import { Link } from "react-router-dom";
import '../css/components.css'

const NotFoundPage = () => {
  return(
    <div className="error-link-page">
        <Link to="/">Click To Return Home </Link>
    </div>
  );
}

export default NotFoundPage;