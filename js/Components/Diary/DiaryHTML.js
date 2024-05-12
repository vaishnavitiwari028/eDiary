export default ` 
<div class="diary_datepicker_wrapper start_animate">
  <div id="diary_holder" class="diary_container starting_state">
    <div class="page dummy_page"></div>
    <div class="page opening_page">
      <div class="diary_title">
        Your <br />
        eDiary
      </div>
      <button class="btn open_btn" id="open_btn">
        O
      </button>
    </div>
  </div>
  <div class="diary_footer_container flex">
    <button class="go_to_today_btn btn btn_diary_footer">Today's Page</button>
    <button class="choose_date_btn btn btn_diary_footer">Choose Date</button>
  </div>
  <button data-route to="dashboard" class="go_to_dashboard btn btn_secondary">
    Go To Dashboard
  </button>
</div>
`;
