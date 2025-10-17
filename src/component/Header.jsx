import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon"></div>
          </div>

          <nav className="nav-menu">
            <a href="/" className="nav-item">
              Start
            </a>
            <a href="/leads" className="nav-item">
              Leads
            </a>
            <a href="/transactions" className="nav-item">
              Transacties
            </a>
            <a href="/relations" className="nav-item">
              Relaties
            </a>
            <a href="/tasks" className="nav-item">
              Taken
            </a>
            <a href="/media" className="nav-item">
              Media
            </a>
          </nav>
        </div>

        <div className="header-right">
          <div className="more-icon"></div>
          <div className="profile-avatar">AB</div>
        </div>
      </header>
      <div className="header-line"></div>
    </>
  );
}
