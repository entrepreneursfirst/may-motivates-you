// components/CountryCodeSelector.tsx
import { useState, useEffect } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import Cookies from 'js-cookie';
import { initializeCountryCode } from '@/utils/initializeCountryCode';
import { useAuth } from '@/context/AuthContext';

export interface CountryType {
  code: string;
  country: string;
  name: string;
  flag:string;
}

export const countryCodes: CountryType[] = [{
  code: "+1",
  country: "US",
  name: "United States",
  flag: "🇺🇸"
}, {
  code: "+44",
  country: "GB",
  name: "United Kingdom",
  flag: "🇬🇧"
}, {
  code: "+33",
  country: "FR",
  name: "France",
  flag: "🇫🇷"
}, {
  code: "+49",
  country: "DE",
  name: "Germany",
  flag: "🇩🇪"
}, {
  code: "+61",
  country: "AU",
  name: "Australia",
  flag: "🇦🇺"
}, {
  code: "+91",
  country: "IN",
  name: "India",
  flag: "🇮🇳"
}, {
  code: "+81",
  country: "JP",
  name: "Japan",
  flag: "🇯🇵"
}, {
  code: "+86",
  country: "CN",
  name: "China",
  flag: "🇨🇳"
}, {
  code: "+30",
  country: "GR",
  name: "Greece",
  flag: "🇬🇷"
}, {
  code: "+31",
  country: "NL",
  name: "Netherlands",
  flag: "🇳🇱"
}, {
  code: "+32",
  country: "BE",
  name: "Belgium",
  flag: "🇧🇪"
}, {
  code: "+34",
  country: "ES",
  name: "Spain",
  flag: "🇪🇸"
}, {
  code: "+351",
  country: "PT",
  name: "Portugal",
  flag: "🇵🇹"
}, {
  code: "+352",
  country: "LU",
  name: "Luxembourg",
  flag: "🇱🇺"
}, {
  code: "+353",
  country: "IE",
  name: "Ireland",
  flag: "🇮🇪"
}, {
  code: "+354",
  country: "IS",
  name: "Iceland",
  flag: "🇮🇸"
}, {
  code: "+356",
  country: "MT",
  name: "Malta",
  flag: "🇲🇹"
}, {
  code: "+357",
  country: "CY",
  name: "Cyprus",
  flag: "🇨🇾"
}, {
  code: "+358",
  country: "FI",
  name: "Finland",
  flag: "🇫🇮"
}, {
  code: "+359",
  country: "BG",
  name: "Bulgaria",
  flag: "🇧🇬"
}, {
  code: "+36",
  country: "HU",
  name: "Hungary",
  flag: "🇭🇺"
}, {
  code: "+370",
  country: "LT",
  name: "Lithuania",
  flag: "🇱🇹"
}, {
  code: "+371",
  country: "LV",
  name: "Latvia",
  flag: "🇱🇻"
}, {
  code: "+372",
  country: "EE",
  name: "Estonia",
  flag: "🇪🇪"
}, {
  code: "+385",
  country: "HR",
  name: "Croatia",
  flag: "🇭🇷"
}, {
  code: "+386",
  country: "SI",
  name: "Slovenia",
  flag: "🇸🇮"
}, {
  code: "+39",
  country: "IT",
  name: "Italy",
  flag: "🇮🇹"
}, {
  code: "+40",
  country: "RO",
  name: "Romania",
  flag: "🇷🇴"
}, {
  code: "+420",
  country: "CZ",
  name: "Czech Republic",
  flag: "🇨🇿"
}, {
  code: "+421",
  country: "SK",
  name: "Slovakia",
  flag: "🇸🇰"
}, {
  code: "+423",
  country: "LI",
  name: "Liechtenstein",
  flag: "🇱🇮"
}, {
  code: "+43",
  country: "AT",
  name: "Austria",
  flag: "🇦🇹"
}, {
  code: "+45",
  country: "DK",
  name: "Denmark",
  flag: "🇩🇰"
}, {
  code: "+46",
  country: "SE",
  name: "Sweden",
  flag: "🇸🇪"
}, {
  code: "+47",
  country: "NO",
  name: "Norway",
  flag: "🇳🇴"
}, {
  code: "+48",
  country: "PL",
  name: "Poland",
  flag: "🇵🇱"
}];

export default function CountryCodeSelector({
  onSelect,
}: {
  onSelect: (country:  CountryType) => void;
}) {
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [open, setOpen] = useState(false);
  const { user} = useAuth()

  useEffect(() => {
    const init = async () => {
      const code = await initializeCountryCode(user?.id, countryCodes);
      const found = countryCodes.find((c) => c.code === code);
      if (found) setSelectedCountry(found);
    };
    init();
  }, [user?.id]);

  const handleSelect = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    Cookies.set('country_code', country.code); // preserve full + sign
    onSelect(country);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-white border border-gray-300 text-gray-700 px-3 h-full rounded-l-md rounded-r-none hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center min-w-[90px] justify-center gap-1 border-r-0">
          {selectedCountry.flag} {selectedCountry.code} <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white border shadow-lg">
        <div 
                    className="max-h-[300px] overflow-y-auto overscroll-contain"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                    onWheel={(e) => {
                      e.stopPropagation();
                    }}
                  >
        <div className="max-h-[300px] overflow-y-auto">
          <div 
            key={selectedCountry.code} 
            className={`"flex items-center p-3  rounded-t-md cursor-pointer border-b border-gray-100 last:border-b-0" ${selectedCountry.code === selectedCountry.code ? "hover:bg-blue-800 bg-blue-700": "hover:bg-gray-50" } `}
            onClick={() => handleSelect(selectedCountry)}
          >
            <span className="mr-3 text-lg">{selectedCountry.flag}</span>
            <span className="font-medium text-sm text-white">{selectedCountry.code}</span>
            <span className="ml-3 text-sm  truncate text-white">{`${selectedCountry.name}`}</span>
          </div>
          {countryCodes.map((country) => (
            <div
              key={country.code}
              onClick={() => handleSelect(country)}
              className={`flex items-center p-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                country.code === selectedCountry.code ? 'bg-blue-700 text-white hover:bg-blue-800' : 'hover:bg-gray-50'
              }`}
            >
              <span className="mr-3 text-lg">{country.flag}</span>
              <span className="font-medium text-sm">{country.code}</span>
              <span className="ml-3 text-sm truncate">{country.name}</span>
            </div>
          ))}
        </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}