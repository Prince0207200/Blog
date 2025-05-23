import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative overflow-hidden py-12 bg-gray-800 border-t-2 border-gray-700">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-400">
                  &copy; Copyright 2026. All Rights Reserved by Prince.
                </p>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-gray-300">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-gray-300">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legals Section */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-wider mb-6 text-xs font-bold uppercase text-gray-300">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-400 hover:text-gray-200" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
