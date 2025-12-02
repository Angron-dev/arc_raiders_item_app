export default function TextInput({...props}) {
    return (

        <div className="input-group mb-3 w-50 me-3">
            <input
                type="text"
                {...props}
                className="form-control"
                id={props.id ?? props.name}
            />
        </div>)
}
