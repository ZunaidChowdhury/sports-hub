'use client'

const DeleteConfirmation = ({handleDeleteFacility}) => {
    return (
        <div>
            <dialog id="delete_confirmation_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Confirmation</h3>
                    <p className="py-4">Are you sure you want to delete this facility?</p>
                    <div className="modal-action">
                        {/* Added 'flex gap-x-3' to the form to space out the buttons */}
                        <form method="dialog" className="flex gap-x-3">
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn text-white bg-red-600 hover:bg-red-700"
                                onClick={handleDeleteFacility}>
                                Delete
                            </button>
                            <button className="btn">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DeleteConfirmation