import { faEnvelope, faMobile, faPhone, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, RadioGroup, TextArea, TextField, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import ImageUpload from './ImageUpload';
import { createOffer } from '@/actions/actions';


export default function AddOfferForm({ companyId }: { companyId: string}) {

    


    return (
        <Theme>
            <form action={createOffer} className='container mt-6 flex flex-col gap-4'>
                <input type="hidden" value={companyId} name='companyId' />
                <TextField.Root placeholder='Job title' name='title'/>
                
                <div className='grid grid-cols-3 gap-6 *:grow'>
                    <div>
                        Job mode?
                        <RadioGroup.Root defaultValue='ONSITE' name='mode'>
                            <RadioGroup.Item value='ONSITE'>On-site</RadioGroup.Item>
                            <RadioGroup.Item value='HYBRID'>Hybrid</RadioGroup.Item>
                            <RadioGroup.Item value='REMOTE'>Fully remote</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>
                    <div>
                        Employment type?
                        <RadioGroup.Root defaultValue='FULL_TIME' name='employmentType'>
                            <RadioGroup.Item value='FULL_TIME'>Full time</RadioGroup.Item>
                            <RadioGroup.Item value='PART_TIME'>Part time</RadioGroup.Item>
                            <RadioGroup.Item value='INTERNSHIP'>Internship</RadioGroup.Item>
                        </RadioGroup.Root>
                    </div>   
                    <div>
                        Salary
                        <TextField.Root defaultValue={1000} name='salary'>
                            <TextField.Slot>PLN</TextField.Slot>
                            <TextField.Slot>monthly</TextField.Slot>
                        </TextField.Root>
                    </div>                    
                </div>
                <TextField.Root placeholder='Location' name='location'/>
                
                <TextArea placeholder='Job description' resize={'vertical'} name='description'/>
                <div className="flex">
                    <div className='w-1/3'>
                        <h3>Job icon</h3>
                        <ImageUpload name="jobIcon" icon={faStar} />
                    </div>
                    <div className='grow'>
                        <h3>Contact person</h3>
                        <div className='flex gap-2'>
                            <div className=''>
                                <ImageUpload name="contactPhoto" icon={faUser} />
                            </div>
                            <div className='grow flex flex-col gap-1 ml-1'>
                                <TextField.Root placeholder='Name' name='contactName'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faUser} className='text-gray-500 size-4'/>
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Phone" type='tel' name='contactPhone'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faPhone} className='text-gray-500 size-4'/>
                                    </TextField.Slot>
                                </TextField.Root>
                                <TextField.Root placeholder="Email" type='email' name='contactEmail'>
                                    <TextField.Slot>
                                        <FontAwesomeIcon icon={faEnvelope} className='text-gray-500 size-4'/>
                                    </TextField.Slot>
                                </TextField.Root>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex justify-center mt-4'>
                    <Button size="3">
                        <span className='px-8'>Save</span>
                    </Button>
                </div>

            </form>
        </Theme>
    );
}