import React from 'react';

const TrustedCompanies: React.FC = () => {
    return (
        <div className="px-0 py-0">
            <div className="mx-auto max-w-full px-4 py-14 border bg-white">
                <h2 className="text-center text-lg/8 font-semibold text-gray-900">
                    Các công nghệ và đơn vị đồng hành xây dựng
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
                        alt="Transistor"
                        width="158"
                        height="48"
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
                        alt="Reform"
                        width="158"
                        height="48"
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
                        alt="Tuple"
                        width="158"
                        height="48"
                    />
                    <img
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
                        alt="SavvyCal"
                        width="158"
                        height="48"
                    />
                    <img
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                        src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
                        alt="Statamic"
                        width="158"
                        height="48"
                    />
                </div>
            </div>
        </div>
    );
};

export default TrustedCompanies;
