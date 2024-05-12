export default `
<div class="update_profile_container full_screen start_animate_left">
  <div class="user_data_field">
    <label>First Name</label>
    <input
      type="text"
      class="user_data_field_input"
      placeholder="update firstname"
      id="update_user_firstname_input"
    />
  </div>

  <div class="user_data_field">
    <label>Last Name</label>
    <input
      type="text"
      class="user_data_field_input"
      placeholder="update lastname"
      id="update_user_lastname_input"
    />
  </div>

  <div class="user_data_field">
    <label>Gender</label>
    <span>
      <label for="gendermale">Male</label>
      <input
        type="radio"
        id="update_user_gender_male"
        name="gender"
        value="male"
      />
      <label for="genderfemale">Female</label>
      <input
        type="radio"
        id="update_user_gender_female"
        name="gender"
        value="female"
      />
      <label for="genderother">Other</label>
      <input
        type="radio"
        id="update_user_gender_other"
        name="gender"
        value="other"
      />
    </span>
  </div>
  <button class="update_profile_btn btn" id="update_profile_btn">
    Update profile
  </button>
  <button
    data-route
    to="dashboard"
    class="go_to_dashboard_btn btn btn_secondary"
  >
    Go To Dashboard
  </button>
</div>
`;
