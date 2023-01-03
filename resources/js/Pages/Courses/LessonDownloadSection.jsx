import LessonCard from "@/Components/LessonCard";
import Heading1 from "@/Components/Typography/Heading1";
import Level0Image from "@images/Level0_A1.jpg";
import Level1Image from "@images/Level1_A1.jpg";
import Level2Image from "@images/Level2_A1.jpg";
import Level3Image from "@images/Level3_A1.jpg";
import Level4Image from "@images/Level4_A1.jpg";
import LessonDownloadList from "./LessonDownloadList";

import { bibleTimeLevels } from "@/constants";
import { useState } from "react";

export default function LessonDownloadSection() {
    const [selectedLevel, setSelectedLevel] = useState({});

    return (
        <section>
            <Heading1>Bible Time Lessons</Heading1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget tellus venenatis, vestibulum lectus sed, vehicula sapien. Suspendisse ultricies pretium dui a volutpat. Pellentesque vel elementum nulla. Sed aliquet ornare velit et blandit. Nullam id consequat nisi. Nullam convallis vel est rutrum sodales. Sed sollicitudin sed risus at pellentesque. Donec ut diam dolor. Maecenas id lectus vestibulum, euismod mauris id, ornare ex. Duis iaculis eros ut tellus aliquet, id commodo arcu tempus. Pellentesque ac porta mauris. Cras maximus erat in euismod euismod. Aenean mattis feugiat nibh vel semper.
                Suspendisse velit dolor, faucibus ac ligula at, mollis ultricies enim. Integer viverra iaculis nisl, in fermentum velit. In ut imperdiet elit. Sed pulvinar dictum metus, quis pharetra ex porta nec. Curabitur nec lobortis lorem, quis dictum dui. Integer ut neque et arcu condimentum dapibus ut ut augue. Nunc sit amet egestas velit. Duis libero justo, dapibus eget libero vitae, tristique tempus dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel elementum justo. Sed at purus aliquet, vestibulum enim at, ornare velit.</p>

            <div className="flex flex-col md:flex-row justify-around mt-5 w-full">
                {
                    bibleTimeLevels.map((level, index) => (

                        <LessonCard setSelectedLevel={setSelectedLevel} className={"p-2"} key={index} heading={level.tagName} image={level.image} description={"Bible Stories"} type="bibletime"></LessonCard>
                    ))
                }
            </div>
            <LessonDownloadList tagClass={selectedLevel.tagClass} tagCode={selectedLevel.tagCode}></LessonDownloadList>
        </section>
    );
}