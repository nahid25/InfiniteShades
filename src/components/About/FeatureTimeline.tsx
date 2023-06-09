import { ThemeProvider, createTheme } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Typography from "@mui/material/Typography";
import { HiUserCircle } from "react-icons/hi";
import { BsHourglassSplit } from "react-icons/bs";
import { IoDesktopOutline } from "react-icons/io5";

// Create a custom theme for the Timeline component
const theme = createTheme();

const FeatureTimeline = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Timeline position="alternate">
          {/* First timeline item */}
          <TimelineItem sx={{ height: "50vh" }}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              align="right"
              variant="body2"
              color="text.secondary"
              textTransform="uppercase"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
            >
              User Interaction Without Boundaries
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "cornflowerblue" }} />
              <TimelineDot color="primary" variant="outlined">
                <HiUserCircle color="cornflowerblue" />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "green" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2, marginTop: "auto" }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
              >
                New Method of User Authentication
              </Typography>
              <Typography
                sx={{ fontFamily: "Open Sans, sans-serif", fontWeight: "400" }}
              >
                Introducing a new method of user interaction - no traditional
                sign-up required. Our platform has innovatively reimagined user
                experience and interaction. Users can effortlessly explore,
                create, and interact with posts without the constraint of
                creating an account or undergoing the usual authentication
                process. Yet, should you choose to create an account, rest
                assured all your shared information will be preserved securely
                in your profile.
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {/* Second timeline item */}
          <TimelineItem sx={{ height: "50vh" }}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
              textTransform="uppercase"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
            >
              Present and Future
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "green" }} />
              <TimelineDot color="success" variant="outlined">
                <BsHourglassSplit color="green" />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "info" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2, marginTop: "auto" }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
              >
                Opportunities
              </Typography>
              <Typography
                sx={{ fontFamily: "Open Sans, sans-serif", fontWeight: "400" }}
              >
                Our platform offers a haven for photographers and storytellers
                to share their work and stories. The platform amplifies their
                exposure while fostering community growth through user feedback.
                Looking ahead, we envision enhanced interaction capabilities and
                AI-integrated features such as content recommendations and
                automatic image categorization. As well as an option for
                photographers and potential clients to interact with each other.
              </Typography>
            </TimelineContent>
          </TimelineItem>

          {/* Third timeline item */}
          <TimelineItem sx={{ height: "50vh" }}>
            <TimelineOppositeContent
              sx={{ m: "auto 0" }}
              variant="body2"
              color="text.secondary"
              textTransform="uppercase"
              fontFamily="Poppins, sans-serif"
              fontWeight="600"
            >
              UI and UX
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector sx={{ bgcolor: "info" }} />
              <TimelineDot color="info" variant="outlined">
                <IoDesktopOutline />
              </TimelineDot>
              <TimelineConnector sx={{ bgcolor: "info" }} />
            </TimelineSeparator>
            <TimelineContent sx={{ py: "12px", px: 2, marginTop: "auto" }}>
              <Typography
                variant="h6"
                component="span"
                sx={{ fontFamily: "Poppins, sans-serif", fontWeight: "600" }}
              >
                Modern and Responsive
              </Typography>
              <Typography
                sx={{ fontFamily: "Open Sans, sans-serif", fontWeight: "400" }}
              >
                Our site delivers an exceptional user experience with its
                modern, intuitive design, adapting effortlessly across varying
                screen sizes and devices. Users can readily share their content,
                reaching a wider audience without the need for account creation
                or authentication. By leveraging responsive layouts and CSS
                media queries, we ensure a superior user experience across all
                devices - desktop, tablet, or mobile.
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </ThemeProvider>
    </>
  );
};

export default FeatureTimeline;
