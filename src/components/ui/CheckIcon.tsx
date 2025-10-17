
interface CheckIcondProps {
    className?: string;
}

export const CheckIcon = ({ className = "w-10 h-10 text-green-500"}: CheckIcondProps) => {

    return (
        <svg
        className="w-14 h-14 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    )
}