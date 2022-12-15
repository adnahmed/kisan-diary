import { FC } from "react";

export interface IndexPageProps {}

const IndexPage: FC<IndexPageProps> = () => {
  return (
    <>
      <div className="container">
        <div className="Title">
          <span className="TitleMain">Welcome to Kesan Diary</span>
          <span className="TitleDescription">Lets get you up and running</span>
          {/* <SigninFormModal />
          <SignUpFormModal /> */}
        </div>
      </div>
      <footer>
        <div className="ProjectDescription">
          <span>
            Developed by <strong>Adnan Ahmed Khan</strong>
          </span>
          <span>
            Arid # <strong>2018-ARID-0957</strong>
          </span>
          <span>
            Under Supervision of <strong>Mrs. Tayyaba</strong>
          </span>
          <span>
            Submitted to{" "}
            <strong>
              Barani Institute of Information Technology (BIIT) affliated with
              PMAS Arid Agriculture University, Rawalpindi Pakistan
            </strong>
          </span>
        </div>
        <div className="Copyright"> &copy; Copyright Reserved 2022</div>
      </footer>
    </>
  );
};

export default IndexPage;
