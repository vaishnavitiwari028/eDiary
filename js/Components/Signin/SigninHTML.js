export default `
<div class="auth_page_container">
  <svg
    width="263"
    height="297"
    viewBox="0 0 263 297"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="263" height="297" fill="#D2E4E2" fill-opacity="0.85" />
    <g clip-path="url(#clip0)">
      <rect
        width="375"
        height="667"
        transform="translate(-113 7)"
        fill="white"
      />
      <path
        d="M273 100.5C273 139.436 245.689 171 212 171C178.311 171 237.5 90 154 131C154 92.0639 178.311 30 212 30C245.689 30 273 61.5639 273 100.5Z"
        fill="#00BFA6"
      />
      <path
        d="M537 165.5C537 232.603 461.336 287 368 287C216.5 330.5 199 232.603 199 165.5C199 98.3974 274.664 44 368 44C461.336 44 537 98.3974 537 165.5Z"
        fill="#00BFA6"
      />
    </g>
    <ellipse cx="128.5" cy="61.5" rx="73.5" ry="75.5" fill="#00BFA6" />
    <ellipse cx="202" cy="1" rx="201" ry="82" fill="#00BFA6" />
    <defs>
      <clipPath id="clip0">
        <rect
          width="375"
          height="667"
          fill="white"
          transform="translate(-113 7)"
        />
      </clipPath>
    </defs>
  </svg>
  <div class="global_container">
    <form class="form_container" id="signin_form">
      <div class="auth_title_container">Sign In</div>
      <label for="input_email_signin" class="label_email_signin">Email</label>
      <input
        class="input_email_signin"
        id="input_email_signin"
        type="email"
        value=""
        required
      />
      <label for="input_password_signin" class="label_password_signin"
        >Password</label>
      <input
        class="input_password_signin"
        id="input_password_signin"
        type="password"
        value=""
        required
      />
      <button type="submit" class="signin_submit_btn btn">Log in</button>
      <div class="have_account">
        <span class="no_break">Dont have an account ? </span>
        <span class="no_break"><a data-route href="signup">Create account</a></span>
      </div>
    </form>
  </div>
</div>
`;
