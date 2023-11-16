import React, {Fragment, useState} from 'react'

const EditTodo = ({item}) => {
    const [name, setName] = useState(item.name);
    const [email, setEmail] = useState(item.email);
    const [phone, setPhone] = useState(item.phone);
    const [address, setAddress] = useState(item.address);
    const [description, setDescription] = useState(item.description);

    // const [previousData, setPreviousData] = useState({});

    //edit description function 

    const updateAllData = async(e) => {
        e.preventDefault();
        try {
            const body = {name, email, phone, address, description};
            const response = await fetch(`http://localhost:5000/update/${item.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
           })
           console.log(response.json())
           window.location = '/';
        } catch (err) {
            console.error(err.message)
        }
    }
    const handleCloseModal = async () => {
        try {
            const response = await fetch(`http://localhost:5000/fetch/${item.id}`)
            const jsonData = await response.json()

            setName(jsonData.name);
            setEmail(jsonData.email);
            setPhone(jsonData.phone);
            setAddress(jsonData.address);
            setDescription(jsonData.description);
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <Fragment>

            {/* <!-- Button trigger modal --> */}
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${item.id}`}>
                Edit
</button>

            {/* <!-- Modal --> */}
            {/* id = id10 */}
            <div class="modal fade" id={`id${item.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Edit Data</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleCloseModal}></button>
                        </div>
                        <div class="modal-body">
                            <div className='row mb-3 text-start'>
                                <div className='col-6'>
                                    <label for="exampleFormControlInput1" class="form-label">Name:</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="please enter yor name" value={name} onChange={e => setName(e.target.value)} />
                                </div>
                                <div className='col-6'>
                                    <label for="exampleFormControlInput1" class="form-label">Email:</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="please enter your email address" value={email} onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className='row mb-3 text-start'>
                                <div className='col-6'>
                                    <label for="exampleFormControlInput1" class="form-label">Phone:</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Enter your phone number" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                                <div className='col-6'>
                                    <label for="exampleFormControlInput1" class="form-label">Address:</label>
                                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="please enter your address" value={address} onChange={e => setAddress(e.target.value)} />
                                </div>
                            </div>
                            <div className='row mb-3 text-start'>
                                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={description} onChange={e => setDescription(e.target.value)} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={handleCloseModal}>Close</button>
                            <button type="button" class="btn btn-warning" onClick={e => updateAllData(e)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo;