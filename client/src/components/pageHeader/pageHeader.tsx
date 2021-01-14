import "../../scss/_pageHeader.scss";

interface IPageHeader{
    header: string;
}

export default function PageHeader(props: IPageHeader){

    return(
        <div className="page-header">
            <h2>{props.header}</h2>
        </div>
    );
}