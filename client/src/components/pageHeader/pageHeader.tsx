import "../../scss/_pageHeader.scss";

interface IPageHeader{
    header: string;
    settings: boolean;
}

export default function PageHeader(props: IPageHeader){

    return(
        <div className="page-header">
            <h2>{props.header}</h2>
            {props.settings ? <i className="fas fa-ellipsis-v"></i> : ""}
        </div>
    );
}