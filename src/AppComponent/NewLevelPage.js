import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h2>新關卡製作中...</h2>
      <Link to="/">回主頁</Link>
    </div>
  );
}

export default ErrorPage;
