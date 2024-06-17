interface Props {
    id: number;
    title: string;
}

export const FileButton:React.FC<Props> = ({ id, title }) => {
    return (
        <button
            id={id.toString()} 
            className="rounded-lg btn-shadow transition-colors text-base font-semibold min-w-64 p-5 pl-8 pr-8"
        >
        {
            title.length > 16 ? `${title.slice(0,15)} ...` : title
        }
        </button>
    )
}