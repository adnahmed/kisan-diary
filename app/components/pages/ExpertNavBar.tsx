import { Button } from "@chakra-ui/react";
import { Link } from "@remix-run/react";
import { HiSpeakerWave } from "react-icons/hi2";

export default function ExpertNavBar() {
  return (
    <div className="navbar">
      <Link to="/expert/alerts">
        <div className="button manage_alerts">
          <Button
            leftIcon={<HiSpeakerWave />}
            bg="cabi"
            color="white"
            border="1px"
            borderColor="cabi"
            _hover={{ bg: "wheat", color: "cabi" }}
          >
            Manage Alerts / Recommendations
          </Button>
        </div>
      </Link>
    </div>
  );
}
