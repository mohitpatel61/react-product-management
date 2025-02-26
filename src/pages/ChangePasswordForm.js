import Messages from "../components/common/Messages";

const ChangePasswordForm = ({handleSubmit, handleChange, changePassData, loggedUserData, successMessage, errorMessage}) => {
    return (
        <div className="row">
        <h2>Change Password</h2>
         <Messages type="success" message={successMessage} />
         <Messages type="danger" message={errorMessage} />
        <div className="col-8">
              <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="col-form-label">Current password :</label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      value={changePassData?.currentPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">New password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={changePassData?.newPassword}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label">Confirm password:</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={changePassData?.confirmPassword}
                      onChange={handleChange}
                    />
                   </div>
        
                   <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" >
                        Update password 
                        </button>
                    </div>
                </form>
        </div>
    </div>
    );
}

export default ChangePasswordForm;