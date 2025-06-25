const PricingTips = () => {
   return (
      <div className="bg-muted p-4 rounded-lg w-full mt-6">
         <h3 className="text-md font-medium mb-2">
            Pricing Tips and Information
         </h3>
         <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Consider your experience and expertise when setting your prices</li>
            <li>Competitive pricing attracts more mentees</li>
            <li>You can adjust your pricing at any time</li>
            <li>For each booking, 10% will be deducted as platform fees</li>
            <li>Price changes will only apply to future sessions</li>
            <li>Pricing must be between ₹200 to ₹10,000</li>
         </ul>
      </div>
   )
}

export default PricingTips;
