'use client';

import { useState } from 'react';
import Image from 'next/image';
import brandLogo from '@/asset/brand-logo.svg';
import { ChatResponseSchema } from '@/types/ai';

export default function AssistantPage() {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('specific');
  const [result, setResult] = useState(ChatResponseSchema.parse({}));
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleInputSubmit = async (event) => {
    setIsLoading(true);
    fetch(`/api/ask?message=${message}&type=${type}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => setResult(ChatResponseSchema.parse(data.data)))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));

    event.preventDefault();
  };

  return (
    <div className="flex min-h-[600px] flex-1 flex-col align-middle p-6 sm:px-6 lg:px-8 py-18">
      <div className="flex flex-col-reverse items-center justify-center">
        <Image src={brandLogo} alt="Brand Logo" width={150} height={150} />
      </div>

      <form className="mt-16">
        <div className="text-sm flex justify-center">
          <label className="p-2">
            <input
              type="radio"
              name="type"
              value="specific"
              checked={type === 'specific'}
              onChange={handleTypeChange}
            />{' '}
            &nbsp; Specific
            <div className="text-gray-500 mt-1">
              Details like location, phone number, etc.
            </div>
          </label>
          <label className="p-2">
            <input
              type="radio"
              name="type"
              value="general"
              checked={type === 'general'}
              onChange={handleTypeChange}
            />{' '}
            &nbsp; General
            <div className="text-gray-500 mt-1">
              General questions to government services
            </div>
          </label>
        </div>
        <div className="flex flex-row items-center justify-center mt-4">
          <div className="bg-white relative flex w-full hover:shadow-lg focus-within:shadow-lg max-w-md rounded-full border border-gray-200 px-6 py-4 items-center sm:max-w-xl lg:max-w-2xl">
            <input
              type="text"
              className="flex-grow focus:outline-none bg-transparent"
              placeholder="Where should I go to make my passport ?"
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="w-[54px] h-[54px] absolute end-0 flex align-middle rounded-full bg-christmasGreen-700 px-4 py-4 text-lg font-semibold text-gray-100 shadow-sm ring-1 ring-inset ring-slate-500 hover:bg-slate-500 bg-slate-600 disabled:bg-slate-400 disabled:ring-slate-400"
              disabled={!message || isLoading}
              onClick={handleInputSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <p className="text-center mt-8">Loading...</p>
      ) : (
        !!Object.values(result).length && (
          <div className="flex flex-row items-center justify-center mt-20 max-w-md mx-auto">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow">
              <div className="rounded-tl-lg rounded-tr-lg sm:rounded-tr-none group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-christmasGreen-700">
                {result.feedback ? (
                  <p className="mt-2 text-sm text-gray-500">
                    {result.feedback}
                  </p>
                ) : (
                  <div>
                    <b>{result.name}</b>
                    <p className="mt-2 text-sm text-gray-500">
                      {result.summary}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{result.about}</p>
                    {result.info?.length && (
                      <ul className="text-sm mt-4 text-gray-500 ">
                        {result.info.map(({ location, phone_number }) => (
                          <>
                            <li className="bg-gray-100 p-4 mt-2">
                              <div>
                                <b>Location: </b>
                                {location}
                              </div>

                              <div>
                                <b>Phone Number: </b>
                                {phone_number}
                              </div>
                            </li>
                          </>
                        ))}
                      </ul>
                    )}
                    {result.website && (
                      <>
                        <div className="mt-4 text-sm text-gray-500">
                          <b>Website: </b>
                          <a
                            href={result.website}
                            target="_blank"
                            className="text-sm mt-2 text-blue-500"
                          >
                            {result.website}
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}{' '}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
