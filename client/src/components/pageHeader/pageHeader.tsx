import "../../scss/_pageHeader.scss";
import logo from "../../images/120pdl.svg";

interface IPageHeader{
    header: string;
    settings: boolean;
}

export default function PageHeader(props: IPageHeader){

    return(
        <div className="page-header">
            {props.header === "logo" ? <img src={logo} alt="logo"/> : <h2>{props.header}</h2>}
            {props.settings ? <i className="fas fa-ellipsis-v"></i> : ""}
        </div>
    );
}