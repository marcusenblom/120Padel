
interface IProfileStatProps{
    header: string;
    value: any;
}

export default function ProfileStat(props: IProfileStatProps){


    return(
        <div>
            <span>{props.header}</span>: <span>{props.value}</span>
        </div>
    );
}